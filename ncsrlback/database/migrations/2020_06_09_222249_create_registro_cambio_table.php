<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistroCambioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registro_cambio', function (Blueprint $table) {
            $table->id('id_regcam');
            $table->string('des_regcam', 200)->nullable();
            $table->string('det_regcam', 200)->nullable();
            $table->foreignId('id_tipcam')->nullable()->references('id_tipcam')->on('tipo_cambio');
            $table->foreignId('id_col')->nullable()->references('id_col')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registro_cambio');
    }
}
