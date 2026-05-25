<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $isLocal = app()->environment('local');
        $this->upsertAdmin(
            prefix: 'PROD_ADMIN',
            localFallbacks: [
                'email' => 'admin@missketoureine.test',
                'password' => 'admin1234',
                'name' => 'Super Admin',
                'phone' => '0000000000',
                'role' => 'superadmin',
                'status' => 'active',
            ],
            isLocal: $isLocal,
        );

        $this->upsertAdmin(
            prefix: 'STAFF_ADMIN',
            localFallbacks: [
                'email' => 'missketoureine@gmail.com',
                'password' => 'AdminMkr2026!',
                'name' => 'Administrateur Miss Kétou LA REINE',
                'phone' => '+22955748787',
                'role' => 'admin',
                'status' => 'active',
            ],
            isLocal: $isLocal,
        );
    }

    private function upsertAdmin(string $prefix, array $localFallbacks, bool $isLocal): void
    {
        $email = trim((string) env("{$prefix}_EMAIL", $isLocal ? ($localFallbacks['email'] ?? '') : ''));
        $password = (string) env("{$prefix}_PASSWORD", $isLocal ? ($localFallbacks['password'] ?? '') : '');

        if ($email === '' || $password === '') {
            return;
        }

        Admin::updateOrCreate(
            ['email' => $email],
            [
                'name' => trim((string) env("{$prefix}_NAME", $isLocal ? ($localFallbacks['name'] ?? 'Admin') : 'Admin')) ?: 'Admin',
                'phone' => trim((string) env("{$prefix}_PHONE", $localFallbacks['phone'] ?? '0000000000')) ?: '0000000000',
                'password' => Hash::make($password),
                'role' => trim((string) env("{$prefix}_ROLE", $localFallbacks['role'] ?? 'admin')) ?: 'admin',
                'status' => trim((string) env("{$prefix}_STATUS", $localFallbacks['status'] ?? 'active')) ?: 'active',
            ]
        );
    }
}
