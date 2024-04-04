<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Users Tables
        Schema::create('employees', function (Blueprint $table) {
            $table->id('id')->primary(); 
            $table->string('user_name', 50);
            $table->string('password' ,50)->unique();
            $table->string('mobile' ,50)->nullable(); // to make them all varchar(50)
            $table->string('email' ,50);
            $table->enum('role_id', ['guest', 'scheduler', 'admin']); 
            $table->timestamps();
        });
        // Rooms table
        Schema::create('rooms', function (Blueprint $table) {
            $table->id('id')->primary(); 
            $table->string('room_name');
        });
        
        // Transaction table
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('id')->primary(); 
            $table->unsignedBigInteger('employee_id');
            $table->foreign('employee_id')->references('id')->on('employees'); // this must a users but for now it is employees
            $table->unsignedBigInteger('room_id');
            $table->foreign('room_id')->references('id')->on('rooms');
            $table->datetime('rent_start');
            $table->datetime('rent_date');
            $table->timestamps();
            // $table->float('price_total');
        });

        // Service tables
        Schema::create('services', function (Blueprint $table) {
            $table->id('id')->primary(); 
            $table->string('name', 50);
            $table->float('price'); 
        });


        

        // Our pivot table
        Schema::create('service_transactions', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id')->references('id')->on('services');
            $table->unsignedBigInteger('transaction_id');
            $table->foreign('transaction_id')->references('id')->on('transactions');
        });


        // Testimonial Table
        Schema::create('tertimonials', function (Blueprint $table) {
            $table->id('id')->primary(); 
            $table->string('feedback', 255);
            $table->integer('rating');
            $table->unsignedBigInteger('transaction_id');
            $table->foreign('transaction_id')->references('id')->on('transactions');
        });
        
        


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee');
    }
};
