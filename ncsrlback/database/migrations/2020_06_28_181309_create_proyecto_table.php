<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProyectoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proyecto', function (Blueprint $table) {
            $table->id('id_proy');
            $table->string('nom_proy', 250);
            $table->char('ser_proy', 8)->nullable();
            $table->char('num_proy',4)->nullable();
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
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
        Schema::dropIfExists('proyecto');
    }
}
