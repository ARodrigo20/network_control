<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenCompraDetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orden_compra_det', function (Blueprint $table) {
            $table->id('id_ord_det');
            $table->foreignId('id_ord_com')->nullable()->references('id_ord_com')->on('orden_compra');
            $table->foreignId('id_prod')->nullable()->references('id_prod')->on('producto');
            $table->string('ord_com_det_numpar', 100)->nullable();
            $table->string('ord_com_det_fab', 100)->nullable();
            $table->string('ord_com_det_des', 2000)->nullable();
            $table->float('ord_com_det_can')->nullable();
            $table->char('ord_com_det_unimed', 10)->nullable();
            $table->float('ord_com_det_preuni')->nullable();
            $table->char('ord_com_det_est', 2)->nullable();
            $table->dateTime('ord_com_det_feclleg')->nullable();
            $table->float('ord_com_det_canent')->nullable();
            $table->float('ord_com_det_canfal')->nullable();
            $table->char('ord_com_prod_serv', 1)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orden_compra_det');
    }
}
