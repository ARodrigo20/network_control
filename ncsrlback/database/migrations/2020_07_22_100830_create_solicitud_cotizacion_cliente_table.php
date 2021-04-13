<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudCotizacionClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitud_cotizacion_cliente', function (Blueprint $table) {
            $table->id('solcli_id');
            $table->string('solcli_cod', 20)->unique();
            $table->dateTime('solcli_fec')->nullable();
            $table->foreignId('id_proy')->nullable()->references('id_proy')->on('proyecto');
            $table->string('solcli_proy_nom', 250)->nullable();
            $table->char('solcli_proy_cod', 20)->nullable();
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
            $table->string('solcli_cli_nom', 200)->nullable();
            $table->char('solcli_cli_numdoc', 11)->nullable();
            $table->char('solcli_cli_tipdoc', 20)->nullable();
            $table->string('solcli_cli_dir', 200)->nullable();
            $table->integer('solcli_cli_id_dir')->nullable();
            $table->string('solcli_cli_con', 100)->nullable();
            $table->integer('solcli_cli_id_con')->nullable();
            $table->foreignId('id_col')->nullable()->references('id_col')->on('users');
            $table->string('solcli_col_nom', 200)->nullable();
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
        Schema::dropIfExists('solicitud_cotizacion_cliente');
    }
}
