<?php

namespace App\Jobs;

use App\Models\Vote;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class DetectFraudJob implements ShouldQueue
{
    use Queueable;

    public function handle(): void
    {
        $service = app(\App\Services\FraudDetectionService::class);

        Vote::successful()
            ->whereDate('created_at', now()->toDateString())
            ->chunk(200, function ($votes) use ($service): void {
                foreach ($votes as $vote) {
                    $service->report($vote->user_id, $vote->id, $vote->ip_address, 10, 'Daily scan');
                }
            });
    }
}
