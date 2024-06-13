<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\WebUserController;
use App\Models\SentEmailLog;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


//  get , put and post multi-function
Route::resource("/user", WebUserController::class);

Route ::get("/home",[WebUserController::class, "home"])->name("home");


Route ::get("/login",[WebUserController::class, "login"])->name("login");
Route::post('/login', [WebUserController::class, "loginPost"])->name("login");

Route::get('/register', [WebUserController::class, "register"])->name("register");
Route::post('/register', [WebUserController::class, "registerPost"])->name("register");

Route::get('send-email',[EmailController::class, 'sendWelcomeEmail']);



Route::get('/sent-emails', function () {
    $sentEmails = SentEmailLog::latest()->get(); 
    return view('sent_emails', compact('sentEmails'));
})->name('sent-emails');
