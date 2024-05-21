<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;


    public function transactions(){
        return $this->belongsToMany(Transaction::class)->withPivot("price");
    }

    protected $fillable = [
        'name',
        'price'
    ];
}
