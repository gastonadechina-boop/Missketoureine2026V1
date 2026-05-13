<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Candidate;
use Illuminate\Support\Str;

class TestCandidateSeeder extends Seeder
{
    public function run(): void
    {
        $candidates = [
            [
                'public_number' => '01',
                'public_uid' => \Illuminate\Support\Str::random(26),
                'category_id' => 1,
                'first_name' => 'Amina',
                'last_name' => 'ADÉOYÉ',
                'slug' => 'amina-adeoye',
                'email' => 'amina@example.com',
                'phone' => '22990000001',
                'bio' => 'Passionnée par la culture de Kétou, Amina souhaite porter haut les valeurs de la femme béninoise.',
                'photo_path' => 'candidates/candidate_1.png',
                'photo_original_path' => 'candidates/candidate_1.png',
                'age' => 21,
                'city' => 'Kétou',
                'university' => 'UAC',
                'status' => 'active',
                'photo_processing_status' => 'ready',
                'is_active' => true,
            ],
            [
                'public_number' => '02',
                'public_uid' => \Illuminate\Support\Str::random(26),
                'category_id' => 1,
                'first_name' => 'Fatima',
                'last_name' => 'SOUMANOU',
                'slug' => 'fatima-soumanou',
                'email' => 'fatima@example.com',
                'phone' => '22990000002',
                'bio' => 'Étudiante en sociologie, Fatima s’engage pour l’autonomisation des jeunes filles de sa commune.',
                'photo_path' => 'candidates/candidate_2.png',
                'photo_original_path' => 'candidates/candidate_2.png',
                'age' => 23,
                'city' => 'Kétou',
                'university' => 'UAC',
                'status' => 'active',
                'photo_processing_status' => 'ready',
                'is_active' => true,
            ],
            [
                'public_number' => '03',
                'public_uid' => \Illuminate\Support\Str::random(26),
                'category_id' => 1,
                'first_name' => 'Olufunmi',
                'last_name' => 'BALOGOUN',
                'slug' => 'olufunmi-balogoun',
                'email' => 'olufunmi@example.com',
                'phone' => '22990000003',
                'bio' => 'Fière de ses racines Yoruba, Olufunmi veut promouvoir le patrimoine immatériel de Kétou.',
                'photo_path' => 'candidates/candidate_3.png',
                'photo_original_path' => 'candidates/candidate_3.png',
                'age' => 20,
                'city' => 'Kétou',
                'university' => 'UAC',
                'status' => 'active',
                'photo_processing_status' => 'ready',
                'is_active' => true,
            ],
        ];

        foreach ($candidates as $candidate) {
            Candidate::updateOrCreate(['email' => $candidate['email']], $candidate);
        }
    }
}
