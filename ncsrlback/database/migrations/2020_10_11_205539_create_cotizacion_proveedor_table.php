<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCotizacionProveedorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cotizacion_proveedor', function (Blueprint $table) {
            $table->id('cotprov_id');
            $table->foreignId('solcli_id')->nullable()->references('solcli_id')->on('solicitud_cotizacion_cliente');
            $table->foreignId('id_proy')->nullable()->references('id_proy')->on('proyecto');
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
            $table->foreignId('id_prov')->nullable()->references('id_prov')->on('proveedor');
            $table->dateTime('cotprov_fec')->nullable();
            $table->string('cotprov_razsoc', 250)->nullable();
            $table->char('cotprov_ruc', 20)->nullable();
            $table->char('cotprov_tipdoc', 20)->nullable();
            $table->string('cotprov_dir', 100)->nullable();
            $table->string('cotprov_con', 100)->nullable();
            $table->string('cotprov_ema', 100)->nullable();
            $table->char('est_reg', 3)->nullable();
            $table->char('est_env', 1)->nullable();
            $table->string('cotprov_cod', 100)->unique();
            $table->foreignId('id_col')->nullable()->references('id_col')->on('users');
            $table->string('cotprov_col_nom', 100)->nullable();
            $table->string('cotprov_col_usu', 100)->nullable();
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
        Schema::dropIfExists('cotizacion_proveedor');
    }
}
