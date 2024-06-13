<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SentEmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipient_email',
        'sent_at',
        'subject',
    ];

    protected $dates = [
        'sent_at',
    ];

    // Define relationships if any
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
