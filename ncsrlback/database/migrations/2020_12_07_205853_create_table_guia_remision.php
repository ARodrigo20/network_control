<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableGuiaRemision extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guia_remision', function (Blueprint $table) {
            $table->id('id_guia_remision');
            $table->string('tipoDoc', 100)->nullable();
            $table->string('serie', 20)->nullable();
            $table->string('correlativo', 20)->nullable();
            $table->string('observacion', 200)->nullable();
            $table->dateTime('fechaEmision')->nullable();
            $table->foreignId('id_emp')->nullable()->references('id_emp')->on('empresa');
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
            $table->foreignId('id_envio')->nullable()->references('id_envio')->on('envio');
            $table->string('observaciones', 20)->nullable();
            $table->foreignId('solcli_id')->nullable()->references('solcli_id')->on('solicitud_cotizacion_cliente');
            $table->char('est_reg', 2);
            $table->char('est_env', 2);
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
        Schema::dropIfExists('guia_remision');
    }
}
