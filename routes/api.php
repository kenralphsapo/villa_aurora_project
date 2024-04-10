<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//create Route:
//is case sensitive, must use proper casing


Route::prefix("users")->group(function(){
    //POST: http://localhost:8000/api/users Register
    Route::post("/", [App\Http\Controllers\UserController::class, 'store']);

    //GET: http://localhost:8000/api/users  showAll
    Route::get("/", [App\Http\Controllers\UserController::class, 'index']);

    //GET: http://localhost:8000/api/users/{user} showSpecific
    Route::get("/{user}", [App\Http\Controllers\UserController::class, 'show']);

    //PATCH: http://localhost:8000/api/users/{user}
    Route::PATCH("/{user}", [App\Http\Controllers\UserController::class, 'update']);

    //DELETE: http://localhost:8000/api/users/{user}
    Route::delete("/{user}", [App\Http\Controllers\UserController::class, 'destroy']);

});
//POST: http://localhost:8000/api/login
Route::post("/login", [App\Http\Controllers\AuthController::class,'login']);



Route::prefix("services")->group(function(){
    //POST: http://localhost:8000/api/services Add Service
    Route::post("/", [App\Http\Controllers\ServiceController::class, 'addService']);

    //GET: http://localhost:8000/api/services  show All Services
    Route::get("/", [App\Http\Controllers\ServiceController::class, 'showAllServices']);

    //GET: http://localhost:8000/api/services {service} show specific service
    Route::get("/{service}", [App\Http\Controllers\serviceController::class, 'showService']);

    //PATCH: http://localhost:8000/api/services/{service} update service
    Route::PATCH("/{service}", [App\Http\Controllers\serviceController::class, 'updateService']);

    //DELETE: http://localhost:8000/api/services/{service} delete service
    Route::delete("/{service}", [App\Http\Controllers\serviceController::class, 'destroyService']);    
});
