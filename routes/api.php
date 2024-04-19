<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//create Route:
//is case sensitive, must use proper casing

//create Route:
//is case sensitive, must use proper casing

//User Register

//POST: http://localhost:8000/api/register

Route::post("/register", [App\Http\Controllers\AuthController::class,'register']);

//User Login

//POST: http://localhost:8000/api/login

Route::post("/login", [App\Http\Controllers\AuthController::class,'login']);

//User CheckToken

//POST: http://localhost:8000/api/checkToken
Route::middleware("auth:api")->get("/checkToken", [App\Http\Controllers\AuthController::class,"checkToken"]);


//Users Table
Route::prefix("users")->middleware("auth:api")->group(function(){
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



//Services Table
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


//Service Transaction Table
Route::prefix("serviceTransaction")->group(function(){
    //POST: http://localhost:8000/api/serviceTransaction Add ST
    Route::post("/", [App\Http\Controllers\ServiceTransactionController::class, 'addServiceTransaction']);

    //GET: http://localhost:8000/api/serviceTransactions  show All STs
    Route::get("/", [App\Http\Controllers\ServiceTransactionController::class, 'showAllServiceTransactions']);

    //GET: http://localhost:8000/api/rooms {room} show specific room
    Route::get("/{serviceTransaction}", [App\Http\Controllers\ServiceTransactionController::class, 'showServiceTransaction']);

    //PATCH: http://localhost:8000/api/serviceTransactions/{serviceTransaction} update ST
    Route::PATCH("/{serviceTransaction}", [App\Http\Controllers\ServiceTransactionController::class, 'updateServiceTransaction']);

    //DELETE: http://localhost:8000/api/serviceTransactions/{serviceTransaction} delete ST
    Route::delete("/{serviceTransaction}", [App\Http\Controllers\ServiceTransactionController::class, 'deleteServiceTransaction']);    
});



//Rooms Table
Route::prefix("rooms")->group(function(){
    //POST: http://localhost:8000/api/rooms Add Room
    Route::post("/", [App\Http\Controllers\RoomController::class, 'addRoom']);

    //GET: http://localhost:8000/api/rooms  show All Rooms
    Route::get("/", [App\Http\Controllers\RoomController::class, 'showAllRooms']);

    //GET: http://localhost:8000/api/rooms {room} show specific room
    Route::get("/{room}", [App\Http\Controllers\RoomController::class, 'showRoom']);

    //PATCH: http://localhost:8000/api/services/{service} update service
    Route::PATCH("/{room}", [App\Http\Controllers\RoomController::class, 'updateRoom']);

    //DELETE: http://localhost:8000/api/services/{service} delete service
    Route::delete("/{room}", [App\Http\Controllers\RoomController::class, 'deleteRoom']);    
});


//Transaction Table
Route::prefix("transactions")->group(function(){

    Route::post("/", [App\Http\Controllers\TransactionController::class, 'transaction']);
});


