<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    private array $tags = [
        'comida',
        'filme',
        'arte',
        'cultura',
        'fofoca',
        'esporte',
        'outros'
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->tags as $tag) {
            DB::table('tags')->insert([
                'value' => $tag,
                'created_at' => now()->micro(),
                'updated_at' => now()->micro()
            ]);
        }
    }
}
