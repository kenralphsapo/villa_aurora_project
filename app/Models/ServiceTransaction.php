<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceTransaction extends Model
{
    use HasFactory;





    protected $fillable = [
        'service_id',
        'transaction_id',
        'price'
    ];




    public function transaction(){
        return $this->hasOne(Transaction::class);
    }

    
    public function service(){
        return $this->belongsTo(Service::class);
    }
}
