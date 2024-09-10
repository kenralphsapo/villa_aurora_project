<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post("/register", [App\Http\Controllers\AuthController::class, 'register']); 
// URL: POST http://localhost:8000/api/register - User registration
Route::post("/login", [App\Http\Controllers\AuthController::class, 'login']); 
// URL: POST http://localhost:8000/api/login - User login
Route::post('forgotPassword', [App\Http\Controllers\AuthController::class, 'forgotPassword']);
// URL: POST http://localhost:8000/api/forgotPassword - User forgot password
Route::post('resetPassword', [App\Http\Controllers\AuthController::class, 'resetPassword']);
// URL: POST http://localhost:8000/api/resetPassword - User reset password

Route::middleware(['auth:api'])->group(function(){
    Route::get('checkToken',[App\Http\Controllers\AuthController::class,'checkToken']);
    // URL: GET http://localhost:8000/api/checkToken - Check token validity (requires authentication)
    Route::post('revokeToken',[App\Http\Controllers\AuthController::class,'revokeToken']);
    // URL: POST http://localhost:8000/api/revokeToken - Revoke token (requires authentication)
   



// User Routes
Route::prefix("users")->group(function() {
    Route::post("/insertUser", [App\Http\Controllers\UserController::class, 'store']); 
    // URL: POST http://localhost:8000/api/users/insertUser - Insert a new user
    Route::get("/retrieveUser", [App\Http\Controllers\UserController::class, 'retrieve']); 
    // URL: GET http://localhost:8000/api/users/retrieveUser - Retrieve user details
    Route::get('/getUser/{id}', [App\Http\Controllers\UserController::class, 'getUser']);
    // URL: GET http://localhost:8000/api/users/getUser - Retrieve specific user details
    Route::post("/updateUser", [App\Http\Controllers\UserController::class, 'update']); 
    // URL: POST http://localhost:8000/api/users/updateUser - Update user information
    Route::post("/deleteUser", [App\Http\Controllers\UserController::class, 'destroy']); 
    // URL: POST http://localhost:8000/api/users/deleteUser - Delete a user
});



// Service Routes
Route::prefix("services")->group(function() {
    Route::post("/insertService", [App\Http\Controllers\ServiceController::class, 'addService']); 
    // URL: POST http://localhost:8000/api/services/insertService - Add a new service

    Route::get("/retrieveService", [App\Http\Controllers\ServiceController::class, 'showAllServices']); 
    // URL: GET http://localhost:8000/api/services/retrieveService - Retrieve all services

    Route::post("/updateService", [App\Http\Controllers\ServiceController::class, 'updateService']); 
    // URL: POST http://localhost:8000/api/services/updateService - Update service details

    Route::post("/deleteService", [App\Http\Controllers\ServiceController::class, 'deleteService']); 
    // URL: POST http://localhost:8000/api/services/deleteService - Delete a service
});



// Room Routes
Route::prefix("rooms")->group(function() {
    Route::post("/insertRoom", [App\Http\Controllers\RoomController::class, 'addRoom']); 
    // URL: POST http://localhost:8000/api/rooms/insertRoom - Add a new room

    Route::get("/retrieveRoom", [App\Http\Controllers\RoomController::class, 'showAllRooms']); 
    // URL: GET http://localhost:8000/api/rooms/retrieveRoom - Retrieve all rooms

    Route::post("/updateRoom", [App\Http\Controllers\RoomController::class, 'updateRoom']); 
    // URL: POST http://localhost:8000/api/rooms/updateRoom - Update room details

    Route::post("/deleteRoom", [App\Http\Controllers\RoomController::class, 'deleteRoom']); 
    // URL: POST http://localhost:8000/api/rooms/deleteRoom - Delete a room
});

// Transaction Routes
Route::prefix("transactions")->group(function() {
    Route::post("/insertTransaction", [App\Http\Controllers\TransactionController::class, 'addTransaction']); 
    // URL: POST http://localhost:8000/api/transactions/insertTransaction - Add a new transaction

    Route::get("/retrieveTransaction", [App\Http\Controllers\TransactionController::class, 'showAllTransactions']); 
    // URL: GET http://localhost:8000/api/transactions/retrieveTransaction - Retrieve all transactions

    Route::post("/updateTransaction", [App\Http\Controllers\TransactionController::class, 'updateTransaction']); 
    // URL: POST http://localhost:8000/api/transactions/updateTransaction - Update transaction details

    Route::post("/deleteTransaction", [App\Http\Controllers\TransactionController::class, 'deleteTransaction']); 
    // URL: POST http://localhost:8000/api/transactions/deleteTransaction - Delete a transaction
});

// Testimonial Routes
Route::prefix("testimonials")->group(function() {
    Route::post("/insertTestimonial", [App\Http\Controllers\TestimonialController::class, 'addTestimonial']); 
    // URL: POST http://localhost:8000/api/testimonials/insertTestimonial - Add a new testimonial

    Route::get("/retrieveTestimonial", [App\Http\Controllers\TestimonialController::class, 'showAllTestimonials']); 
    // URL: GET http://localhost:8000/api/testimonials/retrieveTestimonial - Retrieve all testimonials

    Route::post("/updateTestimonial", [App\Http\Controllers\TestimonialController::class, 'updateTestimonial']); 
    // URL: POST http://localhost:8000/api/testimonials/updateTestimonial - Update testimonial details

    Route::post("/deleteTestimonial", [App\Http\Controllers\TestimonialController::class, 'deleteTestimonial']); 
    // URL: POST http://localhost:8000/api/testimonials/deleteTestimonial - Delete a testimonial
});


});