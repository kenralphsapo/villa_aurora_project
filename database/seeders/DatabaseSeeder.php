<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
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
            'profile' => 'default.png',
        ]);

        // Create William User
        User::create([
            'username' => 'William',
            'password' => Hash::make('123456789'), 
            'mobile' => '09984889752',
            'email' => 'william@gmail.com', 
            'role' => 'admin', 
            'profile' => 'default.png', 
        ]);
        
        User::create([
            'username' => 'Ken Sappo',
            'password' => Hash::make('123456789'), 
            'mobile' => '09984889752',
            'email' => 'kensappo@gmail.com', 
            'role' => 'admin', 
            'profile' => 'default.png',
        ]);

        Service::create([
            'name' => 'Birthday',
            'price' => '2000.00', 
            'image' => 'catering.jpg',
        ]);

        Service::create([
            'name' => 'Wedding',
            'price' => '2000.00', 
            'image' => 'event.jpg',
        ]);

        
    }
}
