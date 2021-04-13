<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGastoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gasto', function (Blueprint $table) {
            $table->id('id_gas');
            $table->dateTime('gas_fec');
            $table->string('gas_fac',100);
            $table->float('gas_subtot')->nullable();
            $table->float('gas_igv')->nullable();
            $table->float('gas_tot')->nullable();
            $table->foreignId('id_prov')->nullable()->references('id_prov')->on('proveedor');
            $table->string('prov_razsoc',100);
            $table->char('prov_ruc',11);
            $table->foreignId('id_proy')->nullable()->references('id_proy')->on('proyecto');
            $table->char('gas_mon',1);
            $table->float('gas_tipcam')->nullable();
            $table->float('gas_totdol')->nullable();
            $table->string('gas_desc',200);
            $table->char('est_reg',2)->nullable();
            $table->string('gas_fac_ser',20);
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
        Schema::dropIfExists('gasto');
    }
}
