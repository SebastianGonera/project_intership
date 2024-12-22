<?php

namespace Database\Seeders;

use App\Models\AcquisitionChannel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcquisitionChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AcquisitionChannel::factory()
            ->count(10)
            ->create();
    }
}
