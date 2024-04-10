<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded=[];
    /*may not be empty array
    hasMany = define a one-to-many relationship between two models.
    belongTo = define a one-to-one or one-to-many relationship where the current model "belongs to" another model. 
    hasOne = define a one-to-one relationship between two models.
    belongToMany = define a many-to-many relationship between two models.
    */
    public function user(){
        return $this->hasOne(User::class); // transaction musst belong to a user, this method used one mandatory and many
    }

    public function serviceTransaction(){
        return $this->hasOne(ServiceTransaction::class);
    }

    public function testimonial(){
        return $this->hasOne(Testimonial::class);
    }

    public function room(){
        return $this->hasOne(Room::class);
    }
}
