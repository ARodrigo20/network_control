<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto', function (Blueprint $table) {
            $table->id('id_prod');
            $table->char('cod_prod', 20)->nullable();
            $table->char('num_parte_prod', 20)->nullable();
            $table->float('stk_prod')->nullable()->default(0);
            $table->string('des_prod', 2000);
            $table->float('pre_com_prod')->nullable();
            $table->integer('mon_prod')->nullable();
            $table->foreignId('id_unimed')->nullable()->references('id_unimed')->on('unidad_medida');
            $table->foreignId('id_mar')->nullable()->references('id_mar')->on('marca');
            $table->foreignId('id_mod')->nullable()->references('id_mod')->on('modelo');
            $table->foreignId('id_fab')->nullable()->references('id_fab')->on('fabricante');
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
        Schema::dropIfExists('producto');
    }
}
