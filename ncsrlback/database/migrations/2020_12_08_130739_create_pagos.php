<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id('id_pagos');
            $table->foreignId('id_factura')->nullable()->references('id_factura')->on('facturas');
            $table->string('medio_pago')->nullable();
            $table->dateTime('fechaPago')->nullable();
            $table->float('monto')->nullable();
            $table->string('referencia',200)->nullable();
            $table->char('est_reg',2)->nullable();
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
        Schema::dropIfExists('pagos');
    }
}
