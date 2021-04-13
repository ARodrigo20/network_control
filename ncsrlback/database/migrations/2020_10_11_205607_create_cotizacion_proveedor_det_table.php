<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCotizacionProveedorDetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cotizacion_proveedor_det', function (Blueprint $table) {
            $table->id('cotprovdet_id');
            $table->integer('cotprovdet_cant')->nullable();
            $table->string('cotprovdet_desc', 2000)->nullable();
            $table->foreignId('cotprov_id')->nullable()->references('cotprov_id')->on('cotizacion_proveedor');
            $table->foreignId('id_prod')->nullable()->references('id_prod')->on('producto');
            $table->string('cotprovdet_prod_codint', 100)->nullable();
            $table->string('cotprovdet_prod_numpar', 200)->nullable();
            $table->string('cotprovdet_prod_fabr', 100)->nullable();
            $table->string('cotprovdet_prod_marc', 50)->nullable();
            $table->char('cotprovdet_prod_unimed', 5)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cotizacion_proveedor_det');
    }
}
