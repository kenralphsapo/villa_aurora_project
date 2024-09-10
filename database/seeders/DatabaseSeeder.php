<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Room;
use App\Models\Testimonial;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        $user = User::create([
            'username' => 'Admin',
            'password' => Hash::make('123456789'),
            'email' => 'admin@gmail.com',
            'mobile' => '09296407470',
            'role' => 'admin',
        ]);

        
        $service = Service::create([
            'name' => 'Cleaning',
            'price' => 100,
        ]);

        
        $room = Room::create([
            'name' => 'Room 1',
            'price' => 100,
        ]);

        
        $transaction = Transaction::create([
            'user_id' => $user->id,   
            'room_id' => $room->id,   
            'rent_start' => '2024-09-15',
            'rent_end' => '2024-09-20',
            'room_price' => $room->price,
        ]);

        
        $transaction->services()->sync([
            $service->id => ['price' => $service->price],
        ]);

        
        Testimonial::create([
            'transaction_id' => $transaction->id,  
            'rating' => 5,
            'feedback' => 'Great service!',
        ]);

        
        Artisan::call('passport:keys');

        
        Artisan::call('passport:client --personal --no-interaction');
    }
}
