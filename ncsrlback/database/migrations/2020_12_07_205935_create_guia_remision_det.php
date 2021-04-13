<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuiaRemisionDet extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guia_remision_det', function (Blueprint $table) {
            $table->id('id_guia_remision_det');
            $table->foreignId('id_guia_remision')->nullable()->references('id_guia_remision')->on('guia_remision');
            $table->string('codigo', 50)->nullable();
            $table->string('descripcion', 100)->nullable();   
            $table->string('unidad', 100)->nullable();
            $table->integer('cantidad')->nullable();
            $table->string('codProdSunat', 10)->nullable();
            $table->foreignId('id_prod')->nullable()->references('id_prod')->on('producto');
            $table->char('est_reg', 2);
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
        Schema::dropIfExists('guia_remision_det');
    }
}
