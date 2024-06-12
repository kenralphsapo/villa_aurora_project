<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'username' => 'Admin',
            'password' => Hash::make('123456789'),
            'mobile' => '09296407470',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'profile' => 'default.png', // Assuming 'default.png' is stored in 'public/images'
        ]);

        // Create William User
        User::create([
            'username' => 'William',
            'password' => Hash::make('123456789'), // Same password as Admin
            'mobile' => '09984889752',
            'email' => 'william@gmail.com', // Update email if needed
            'role' => 'admin', // Same role as Admin
            'profile' => 'default.png', // Assuming 'default.png' is stored in 'public/images'
        ]);
        
        User::create([
            'username' => 'Ken Sappo',
            'password' => Hash::make('123456789'), // Same password as Admin
            'mobile' => '09984889752',
            'email' => 'kensappo@gmail.com', // Update email if needed
            'role' => 'admin', // Same role as Admin
            'profile' => 'default.png', // Assuming 'default.png' is stored in 'public/images'
        ]);
    }
}
