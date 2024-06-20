<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'username' => 'Admin',
            'password' => Hash::make('123456789'),
            'mobile' => '09296407470',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'profile' => 'catering.jpg',
        ]);

        User::create([
            'username' => 'William',
            'password' => Hash::make('123456789'), 
            'mobile' => '09984889752',
            'email' => 'william@gmail.com', 
            'role' => 'admin', 
            'profile' => 'catering.jpg', 
        ]);
        
        User::create([
            'username' => 'Ken Sappo',
            'password' => Hash::make('123456789'), 
            'mobile' => '09984889752',
            'email' => 'kensappo@gmail.com', 
            'role' => 'admin', 
            'profile' => 'catering.jpg',
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

        Room::create([
            'name'=>'KTV Room',
            'price' =>'200.00'
        ]);

        
    }
}
