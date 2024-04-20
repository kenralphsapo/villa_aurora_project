<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    /* public function serviceTransaction(){
        return $this->belongsToMany(ServiceTransaction::class);
        
    }
    */

    public function transactions(){
        return $this->belongsToMany(Transaction::class);
     }

    protected $fillable = [
        'name',
        'price'
    ];
}
