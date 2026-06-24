<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\PasswordChangedConfirmationMail;
use App\Models\ActivityLog;
use App\Models\Admin;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function __construct(private UserRepository $users) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = $this->users->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => Hash::make($data['password']),
            'role' => 'user',
            'status' => 'active',
            'must_change_password' => false,
        ]);

        $token = $this->issueSingleSessionToken($user, 'auth_token', [$user->role]);
        $this->logSecurity($user, 'login_success', ['role' => $user->role]);

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'candidate_id' => $user->candidate_id ?? null,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'must_change_password' => false,
            ],
        ], 201);
    }

    public function forgotPassword(): JsonResponse
    {
        $data = request()->validate(['email' => ['required', 'email', 'exists:users,email']]);

        $user = User::where('email', $data['email'])->first();
        $token = Str::random(60);

        \DB::table('password_reset_tokens')->updateOrCreate(
            ['email' => $user->email],
            ['token' => Hash::make($token), 'created_at' => now()]
        );

        $frontendUrl = rtrim((string) config('app.frontend_url'), '/');
        $resetUrl = "{$frontendUrl}/reset-password?token={$token}&email=".urlencode($user->email);

        try {
            Mail::send('emails.password-reset', ['user' => $user, 'resetUrl' => $resetUrl], function ($message) use ($user) {
                $message->to($user->email)
                    ->subject('Réinitialisation de mot de passe - MissKetouReine');
            });
        } catch (\Throwable $e) {
            Log::warning('Password reset email failed', ['email' => $user->email, 'error' => $e->getMessage()]);
        }

        return response()->json(['message' => 'Si cet email existe, un lien de réinitialisation a été envoyé.']);
    }

    public function resetPassword(): JsonResponse
    {
        $data = request()->validate([
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $record = \DB::table('password_reset_tokens')
            ->where('email', $data['email'])
            ->first();

        if (! $record || ! Hash::check($data['token'], $record->token)) {
            return response()->json(['message' => 'Token de réinitialisation invalide ou expiré.'], 400);
        }

        if (now()->diffInMinutes($record->created_at) > 60) {
            \DB::table('password_reset_tokens')->where('email', $data['email'])->delete();

            return response()->json(['message' => 'Token expiré. Veuillez refaire une demande.'], 400);
        }

        $user = User::where('email', $data['email'])->first();
        if (! $user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        $user->password = Hash::make($data['password']);
        $user->must_change_password = false;
        $user->save();

        \DB::table('password_reset_tokens')->where('email', $user->email)->delete();

        $user->tokens()->delete();

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès.']);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        return $this->authenticate($request->validated());
    }

    public function adminLogin(LoginRequest $request): JsonResponse
    {
        $credentials = array_merge($request->validated(), ['scope' => 'admin']);

        return $this->authenticate($credentials);
    }

    public function logout(): JsonResponse
    {
        $user = request()->user();
        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
            $this->logSecurity($user, 'logout', []);
        }

        return response()->json(['message' => 'Logged out']);
    }

    public function me(): JsonResponse
    {
        $user = request()->user();

        return response()->json([
            'id' => $user->id,
            'candidate_id' => $user->candidate_id ?? null,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role ?? 'user',
            'status' => $user->status ?? 'active',
            'must_change_password' => $user->must_change_password ?? false,
        ]);
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $user = $request->user();

        if (! Hash::check($request->input('current_password'), $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $user->password = Hash::make($request->input('password'));
        $user->must_change_password = false;
        $user->save();
        $user->tokens()->delete();

        $token = $user->createToken('auth_token', [$user->role ?? 'user'])->plainTextToken;

        $this->logSecurity($user, 'password_changed', ['guard' => $user->role ?? 'user']);

        try {
            if ($user->email) {
                Mail::to($user->email)->send(new PasswordChangedConfirmationMail(
                    user: $user,
                    loginUrl: rtrim((string) config('app.frontend_url'), '/').'/login',
                ));
            }
        } catch (\Throwable $exception) {
            Log::warning('Password confirmation email failed', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $exception->getMessage(),
            ]);
        }

        return response()->json([
            'message' => 'Password updated successfully',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'candidate_id' => $user->candidate_id ?? null,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role ?? 'user',
                'status' => $user->status ?? 'active',
                'must_change_password' => false,
            ],
        ]);
    }

    private function logSecurity($user, string $action, array $meta = []): void
    {
        $payload = [
            'causer_id' => $user?->id,
            'causer_type' => $user ? get_class($user) : null,
            'action' => $action,
            'ip_address' => request()->ip(),
            'meta' => $meta,
            'status' => 'active',
        ];

        app()->terminating(static function () use ($payload): void {
            try {
                ActivityLog::create($payload);
            } catch (\Throwable $exception) {
                Log::warning('Security log write skipped', [
                    'action' => $payload['action'] ?? null,
                    'error' => $exception->getMessage(),
                ]);
            }
        });
    }

    private function issueSingleSessionToken(object $account, string $tokenName, array $abilities): string
    {
        $account->tokens()->delete();

        return $account->createToken($tokenName, $abilities)->plainTextToken;
    }

    private const MAX_LOGIN_ATTEMPTS = 5;

    private const LOCKOUT_MINUTES = 15;

    private function incrementLoginAttempts(string $attemptsKey, string $lockoutKey): void
    {
        $attempts = (int) Cache::get($attemptsKey, 0) + 1;
        Cache::put($attemptsKey, $attempts, 60 * self::LOCKOUT_MINUTES);

        if ($attempts >= self::MAX_LOGIN_ATTEMPTS) {
            Cache::put($lockoutKey, now()->addMinutes(self::LOCKOUT_MINUTES)->timestamp, 60 * self::LOCKOUT_MINUTES);
        }
    }

    private function authenticate(array $credentials): JsonResponse
    {
        $credentials['email'] = strtolower(trim((string) ($credentials['email'] ?? '')));
        $scope = $credentials['scope'] ?? 'user';

        $lockoutKey = 'login:lockout:'.sha1($credentials['email']);
        $attemptsKey = 'login:attempts:'.sha1($credentials['email']);

        if (Cache::has($lockoutKey)) {
            $secondsRemaining = Cache::get($lockoutKey) - now()->timestamp;

            return response()->json([
                'message' => 'Trop de tentatives. Réessayez dans '.ceil($secondsRemaining / 60).' minutes.',
            ], 429);
        }

        if ($scope === 'admin') {
            $admin = Admin::where('email', $credentials['email'])->first();

            if (! $admin || ! Hash::check($credentials['password'], $admin->password)) {
                $this->incrementLoginAttempts($attemptsKey, $lockoutKey);
                $this->logSecurity($admin ?? new Admin(['id' => null, 'role' => 'admin']), 'login_failed', ['guard' => 'admin']);

                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            if ($admin->status !== 'active') {
                return response()->json(['message' => 'Account inactive'], 403);
            }

            Cache::forget($attemptsKey);
            Cache::forget($lockoutKey);

            $abilities = $admin->role === 'superadmin' ? ['admin', 'superadmin'] : [$admin->role];
            $token = $this->issueSingleSessionToken($admin, 'admin_token', $abilities);
            $this->logSecurity($admin, 'login_success', ['guard' => 'admin']);

            return response()->json([
                'token' => $token,
                'user' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'role' => $admin->role,
                ],
            ]);
        }

        $user = $this->users->findByEmail($credentials['email']);

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            $this->incrementLoginAttempts($attemptsKey, $lockoutKey);
            $this->logSecurity($user ?? new Admin(['id' => null, 'role' => 'user']), 'login_failed', ['guard' => 'user']);

            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($user->status !== 'active') {
            return response()->json(['message' => 'Account inactive'], 403);
        }

        Cache::forget($attemptsKey);
        Cache::forget($lockoutKey);

        $token = $this->issueSingleSessionToken($user, 'auth_token', [$user->role]);
        $this->logSecurity($user, 'login_success', ['role' => $user->role]);

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'candidate_id' => $user->candidate_id ?? null,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'must_change_password' => $user->must_change_password,
            ],
        ]);
    }
}
