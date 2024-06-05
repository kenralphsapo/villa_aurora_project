<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendWelcomeEmail(){
        $toEmail = 'williamadornado6@gmail.com';
        $message = 'Welcome to Villa Aurora';
        $subject = 'Welcome Email in laravel using gmail';

        $response = Mail::to($toEmail)->send(new WelcomeEmail($message, $subject));

        dd($response);
    }
}
