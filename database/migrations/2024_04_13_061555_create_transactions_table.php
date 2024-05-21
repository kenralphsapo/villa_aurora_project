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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("room_id");
            $table->foreign('room_id')->references('id')->on('rooms');
            $table->decimal("room_price",8,2);
            $table->date("rent_start");
            $table->date("rent_end");
            $table->timestamps();
            $table->foreign("user_id")->references("id")->on("users");

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
