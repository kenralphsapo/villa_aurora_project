<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ApiModel extends Model
{
    //Does not function properly
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'user_name',
        'password',
        'mobile',
        'email',
        'role_id',
    ];

    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        
        'password' => 'hashed',
    ];
}
