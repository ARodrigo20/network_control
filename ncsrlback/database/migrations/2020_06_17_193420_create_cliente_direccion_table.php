<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClienteDireccionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente_direccion', function (Blueprint $table) {
            $table->id('id_cli_dir');
            $table->string('ciu_cli', 50)->nullable();
            $table->string('dir_cli', 200)->nullable();
            $table->char('tel_cli', 10)->nullable();
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
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
        Schema::dropIfExists('cliente_direccion');
    }
}
