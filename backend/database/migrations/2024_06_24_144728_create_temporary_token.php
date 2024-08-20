<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * https://medium.com/@laraveltuts/laravel-add-a-new-column-to-existing-table-in-a-migration-fe4b78a3eb92
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('token')->nullable()->after('role');
        });
    }
    
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('temporary_code');
        });
    }
};
