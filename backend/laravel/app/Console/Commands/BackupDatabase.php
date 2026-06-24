<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class BackupDatabase extends Command
{
    protected $signature = 'backup:database';

    protected $description = 'Dump the database to storage/backups';

    public function handle(): int
    {
        $db = config('database.connections.'.config('database.default'));
        $database = $db['database'] ?? 'database';
        $filename = 'backups/'.$database.'_'.now()->format('Ymd_His').'.sql';

        $command = sprintf(
            'mysqldump -h%s -P%s -u%s %s',
            escapeshellarg($db['host'] ?? '127.0.0.1'),
            escapeshellarg($db['port'] ?? 3306),
            escapeshellarg($db['username'] ?? 'root'),
            escapeshellarg($database)
        );

        $process = new Process(
            command: explode(' ', $command),
            env: ['MYSQL_PWD' => $db['password'] ?? ''],
        );
        $process->run();

        if (! $process->isSuccessful()) {
            $this->error('mysqldump command failed: '.$process->getErrorOutput());

            return 1;
        }

        \Storage::disk('local')->put($filename, $process->getOutput());

        $this->info("Backup stored at storage/app/{$filename}");

        return 0;
    }
}
