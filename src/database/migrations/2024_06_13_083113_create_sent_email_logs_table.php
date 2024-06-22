<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSentEmailLogsTable extends Migration
{
    public function up()
    {
        Schema::create('sent_email_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('recipient_email');
            $table->timestamp('sent_at')->nullable();
            $table->string('subject');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sent_email_logs');
    }
}

