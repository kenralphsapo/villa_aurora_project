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
        Schema::create('service_transaction', function (Blueprint $table) {
            $table->unsignedBigInteger("service_id");
            $table->unsignedBigInteger("transaction_id");
            $table->decimal('price',10,2);
                    $table->foreign("service_id")->references("id")->on("services")->onDelete("cascade");
                    $table->foreign("transaction_id")->references("id")->on("transactions")->onDelete("cascade");
                    $table->primary(["service_id", "transaction_id","price"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_transaction');
    }
};
