<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;


    public function transactions(){
        return $this->belongsToMany(Transaction::class);
    }

    protected $fillable = [
        'name',
        'price'
    ];
}
