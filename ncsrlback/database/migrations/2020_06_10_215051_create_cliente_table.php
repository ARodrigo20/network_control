<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente', function (Blueprint $table) {
            $table->id('id_cli');
            $table->string('razsoc_cli', 200)->nullable();
            $table->char('numdoc_cli', 11)->nullable();
            $table->string('ema_cli', 100)->nullable();
            $table->foreignId('id_tipdoc')->nullable()->references('id_tipdoc')->on('tipo_documento');
            $table->char('est_reg', 2)->default('A');
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
        Schema::dropIfExists('cliente');
    }
}
