<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnticipos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anticipos', function (Blueprint $table) {
            $table->id('id_anticipos');
            $table->foreignId('id_factura')->nullable()->references('id_factura')->on('facturas');
            $table->string('tipoDocRel', 20)->nullable();
            $table->string('nroDocRel', 20)->nullable();	
            $table->float('total', 20)->nullable();
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
        Schema::dropIfExists('anticipos');
    }
}
