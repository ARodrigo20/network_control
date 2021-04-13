<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKardexTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kardex', function (Blueprint $table) {
            $table->id('id_kar');
            $table->dateTime('fec_kar');
            $table->string('cod_kar',100);
            $table->foreignId('id_ord_det')->nullable()->references('id_ord_det')->on('orden_compra_det');
            $table->foreignId('id_ord_com')->nullable()->references('id_ord_com')->on('orden_compra');
            $table->string('prod_desc',250)->nullable();
            $table->string('prod_numpar',100)->nullable();
            $table->char('prod_unimed',5)->nullable();
            $table->float('prod_cant')->nullable();
            $table->string('prov_razsoc',100)->nullable();
            $table->string('fac_kar',100)->nullable();
            $table->string('guirem_kar',100)->nullable();
            $table->string('bol_kar',100)->nullable();
            $table->char('tip_kar',1)->nullable();
            $table->foreignId('id_col')->nullable()->references('id_col')->on('users');
            $table->string('col_usu',100)->nullable();
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
        Schema::dropIfExists('kardex');
    }
}
