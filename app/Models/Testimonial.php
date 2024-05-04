<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory; 


    public function transaction(){
        return $this->belongsTo(Transaction::class);
    }


    protected $fillable = [
        'feedback',
        'rating'
    ];
}
