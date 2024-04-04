<?php

use App\Http\Controllers\APIController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//  get , put and post multi-function
Route::resource("/employee", EmployeeController::class);

// not finished yet
Route ::get("/login",[APIController::class, "login"])->name("login");
Route::post('/login', [APIController::class, "loginPost"])->name("login");

Route::get('/register', [APIController::class, "register"])->name("register");
Route::post('/register', [APIController::class, "registerPost"])->name("register");;

Route ::get("/home",[APIController::class, "home"])->name("home");