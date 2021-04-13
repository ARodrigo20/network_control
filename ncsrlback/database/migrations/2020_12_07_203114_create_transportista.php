<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportista extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportista', function (Blueprint $table) {
            $table->id('id_transportista');
            $table->string('TipoDoc', 50)->nullable();
            $table->string('NumDoc', 50)->nullable();
            $table->string('RznSocial', 20)->nullable();
            $table->string('Placa', 10)->nullable();
            $table->string('ChoferTipoDoc', 2)->nullable();
            $table->string('ChoferDoc', 20)->nullable();
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
        Schema::dropIfExists('transportista');
    }
}
