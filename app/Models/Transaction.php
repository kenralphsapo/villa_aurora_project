<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Transaction extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    protected $fillable = [
        'user_id',
        'room_id',
        'room_price',
        'rent_start',
        'rent_end',
        'service_id',

    ];

    public function services(){
        return $this->belongsToMany(Service::class)->withPivot("price");
     }

    public function user(){
        return $this->hasOne(User::class); 
    }


    public function testimonial(){
        return $this->hasOne(Testimonial::class);
    }

    public function rooms(){
        return $this->hasOne(Room::class);
    }


}
