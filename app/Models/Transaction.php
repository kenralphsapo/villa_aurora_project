<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Transaction extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function services(){
        return $this->belongsToMany(Service::class);
     }

    public function user(){
        return $this->hasOne(User::class); 
    }


    public function testimonial(){
        return $this->hasOne(Testimonial::class);
    }

    public function room(){
        return $this->hasOne(Room::class);
    }


}
