<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded=[];
    //may not be empty array


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function serviceTransaction(){
        return $this->hasMany(ServiceTransaction::class);
    }

    public function testimonial(){
        return $this->hasMany(Testimonial::class);
    }

    public function room(){
        return $this->hasMany(Room::class);
    }
}
