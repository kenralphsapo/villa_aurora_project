<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'username'=>'Admin',
            'password'=>'123456789',
            'email'=>'admin@gmail.com',
            'mobile'=>'09296407470',
            'role'=>'admin',
            'image'=>'default.png'
        ]);
    }
}
