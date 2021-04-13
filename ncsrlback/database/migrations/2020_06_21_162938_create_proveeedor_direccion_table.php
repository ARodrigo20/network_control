<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProveeedorDireccionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proveedor_direccion', function (Blueprint $table) {
            $table->id('id_prov_dir');
            $table->string('ciu_prov', 50);
            $table->string('dir_prov', 200);
            $table->char('tel_prov')->nullable();
            $table->foreignId('id_prov')->nullable()->references('id_prov')->on('proveedor');
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
        Schema::dropIfExists('proveeedor_direccion');
    }
}
