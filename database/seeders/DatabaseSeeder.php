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
            'password' => Hash::make('P@55w0rd'),
            'mobile' => '09296407470',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        User::create([
            'username' => 'William',
            'password' => Hash::make('P@55w0rd'), 
            'mobile' => '09984889752',
            'email' => 'william@gmail.com', 
            'role' => 'admin', 
        ]);
        
        User::create([
            'username' => 'Ken Sapo',
            'password' => Hash::make('P@55w0rd'), 
            'mobile' => '09984889752',
            'email' => 'kensapo@gmail.com', 
            'role' => 'admin', 
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
