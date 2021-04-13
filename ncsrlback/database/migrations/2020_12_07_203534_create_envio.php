<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnvio extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('envio', function (Blueprint $table) {
            $table->id('id_envio');
            $table->string('codTraslado', 50)->nullable();
            $table->string('desTraslado', 50)->nullable();
            $table->boolean('indTransbordo')->nullable();
            $table->float('pesoTotal')->nullable();
            $table->string('undPesoTotal', 10)->nullable();
            $table->float('numBultos', 50)->nullable();
            $table->string('modTraslado', 5)->nullable();
            $table->dateTime('fecTraslado')->nullable();
            $table->string('numContenedor', 10)->nullable();
            $table->string('codPuerto', 10)->nullable();
            $table->foreignId('id_transportista')->nullable()->references('id_transportista')->on('transportista');
            $table->string('ubigueoLlegada', 10)->nullable();
            $table->string('direccionLlegada', 100)->nullable();
            $table->string('ubigueoSalida', 10)->nullable();
            $table->string('direccionSalida', 100)->nullable();
            $table->char('est_reg', 2);
        /*
        "llegada": {
            "ubigueo": "150203",
            "direccion": "AV. ITALIA 459"
        },
        "partida": {
            "ubigueo": "150203",
            "direccion": "AV. ITALIA 458"
        }

        */
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
        Schema::dropIfExists('envio');
    }
}
