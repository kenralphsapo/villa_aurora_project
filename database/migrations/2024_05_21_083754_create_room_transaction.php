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
        Schema::create('room_transaction', function (Blueprint $table) {
            $table->unsignedBigInteger("room_id");
            $table->unsignedBigInteger("transaction_id");
            $table->decimal('price',10,2);
                    $table->foreign("room_id")->references("id")->on("rooms")->onDelete("cascade");
                    $table->foreign("transaction_id")->references("id")->on("transactions")->onDelete("cascade");
                    $table->primary(["room_id", "transaction_id","price"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms_transaction');
    }
};
