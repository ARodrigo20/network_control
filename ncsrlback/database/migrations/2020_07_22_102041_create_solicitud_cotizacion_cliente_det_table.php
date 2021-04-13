<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudCotizacionClienteDetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitud_cotizacion_cliente_det', function (Blueprint $table) {
            $table->id('solclidet_id');
            $table->foreignId('solcli_id')->nullable()->references('solcli_id')->on('solicitud_cotizacion_cliente');
            $table->integer('solclidet_prod_serv')->nullable();
            $table->string('solclidet_des', 2000)->nullable();
            $table->foreignId('id_prod')->nullable()->references('id_prod')->on('producto');
            $table->float('solclidet_prod_can')->nullable();
            $table->string('solclidet_prod_codint', 100)->nullable();
            $table->string('solclidet_prod_numpar', 200)->nullable();
            $table->string('solclidet_prod_fabr', 100)->nullable();
            $table->string('solclidet_prod_marc', 50)->nullable();
            $table->char('solclidet_prod_unimed', 5)->nullable();
            $table->float('solclidet_prod_stock')->nullable();
            $table->char('est_reg', 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solicitud_cotizacion_cliente_det');
    }
}
