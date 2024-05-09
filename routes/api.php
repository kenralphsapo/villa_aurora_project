<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


//Users
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



//Services
Route::prefix("services")->group(function(){
    //POST: http://localhost:8000/api/services Add Service
    Route::post("/", [App\Http\Controllers\ServiceController::class, 'addService']);

    //GET: http://localhost:8000/api/services  show All Services
    Route::get("/", [App\Http\Controllers\ServiceController::class, 'showAllServices']);

    //GET: http://localhost:8000/api/services {service} show specific service
    Route::get("/{service}", [App\Http\Controllers\ServiceController::class, 'showService']);

    //PATCH: http://localhost:8000/api/services/{service} update service
    Route::PATCH("/{service}", [App\Http\Controllers\ServiceController::class, 'updateService']);

    //DELETE: http://localhost:8000/api/services/{service} delete service
    Route::delete("/{service}", [App\Http\Controllers\ServiceController::class, 'deleteService']);    
});


//Rooms
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


//Transaction
Route::prefix("transactions")->group(function(){
       //POST: http://localhost:8000/api/transactions
    Route::post("/", [App\Http\Controllers\TransactionController::class, 'addTransaction']);
    //POST: http://localhost:8000/api/transactions
    Route::post("/", [App\Http\Controllers\TransactionController::class, 'transaction']);

      //GET: http://localhost:8000/api/transactions  show All Transactions
    Route::get("/", [App\Http\Controllers\TransactionController::class, 'showAllTransactions']);

      //PATCH: http://localhost:8000/api/transactions/{transaction} update transaction
    Route::PATCH("/{transaction}", [App\Http\Controllers\TransactionController::class, 'updateTransaction']);

    
    //DELETE: http://localhost:8000/api/transactions/{transaction} delete transaction
    Route::delete("/{testimonial}", [App\Http\Controllers\TransactionController::class, 'deleteTransaction']);
});


//Testimonial Table
Route::prefix("testimonials")->group(function(){
    //POST: http://localhost:8000/api/testimonials Add Testimonial
    Route::post("/", [App\Http\Controllers\TestimonialController::class, 'addTestimonial']);

    //GET: http://localhost:8000/api/testimonials  show Allestimonials
    Route::get("/", [App\Http\Controllers\TestimonialController::class, 'showAllTestimonials']);

    //GET: http://localhost:8000/api/testimonials {testimonial} show specific testimonial
    Route::get("/{testimonial}", [App\Http\Controllers\TestimonialController::class, 'showTestimonal']);

    //PATCH: http://localhost:8000/api/testimonials/{testimonial} update testimonial
    Route::PATCH("/{testimonial}", [App\Http\Controllers\TestimonialController::class, 'updateTestimonial']);

    //DELETE: http://localhost:8000/api/testimonials/{testimonial} delete testimonial
    Route::delete("/{testimonial}", [App\Http\Controllers\TestimonialController::class, 'deleteTestimonial']);    
});
    //GET: http://localhost:8000/api/transactions  show All Transactions
    Route::get("/", [App\Http\Controllers\TransactionController::class, 'showAllTransactions']);
});


//Testimonials
Route::prefix("testimonials")->group(function(){
    //POST: http://localhost:8000/api/testimonials Add testimonial
    Route::post("/", [App\Http\Controllers\TestimonialController::class, 'addTestimonial']);

    //GET: http://localhost:8000/api/testimonials  show All testimonials
    Route::get("/", [App\Http\Controllers\TestimonialController::class, 'showAllTestimonials']);

    //GET: http://localhost:8000/api/testimonials {testimonial} show specific testimonial
    Route::get("/{room}", [App\Http\Controllers\TestimonialController::class, 'showTestimonial']);

    //PATCH: http://localhost:8000/api/testimonials/{testimonial} update testimonial
    Route::PATCH("/{room}", [App\Http\Controllers\TestimonialController::class, 'updateTestimonial']);

    //DELETE: http://localhost:8000/api/testimonials/{testimonial} delete testimonial
    Route::delete("/{room}", [App\Http\Controllers\TestimonialController::class, 'deleteTestimonial']);    
});