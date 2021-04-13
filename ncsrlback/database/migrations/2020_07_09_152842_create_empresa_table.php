<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresa', function (Blueprint $table) {
            $table->id('id_emp');
            $table->string('nom_emp', 200)->nullable();
            $table->char('numdoc_emp', 20)->nullable();
            $table->string('dir_emp', 150)->nullable();
            $table->string('dis_emp', 100)->nullable();
            $table->string('ciu_emp', 100)->nullable();
            $table->char('tel_emp', 20)->nullable();
            $table->char('cel_emp', 20)->nullable();
            $table->char('codciu_emp', 20)->nullable();
            $table->string('img_emp', 200)->nullable();
            $table->string('imgext_emp', 20)->nullable();
            $table->foreignId('id_tipdoc')->nullable()->references('id_tipdoc')->on('tipo_documento');
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
        Schema::dropIfExists('empresa');
    }
}
