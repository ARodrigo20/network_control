<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProveedorColaboradorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proveedor_colaborador', function (Blueprint $table) {
            $table->id('id_prov_col');
            $table->string('nom_prov_col', 100);
            $table->string('ema_prov_col', 100)->nullable();
            $table->char('tel_prov_col',10)->nullable();
            $table->foreignId('id_prov')->nullable()->references('id_prov')->on('proveedor');
            $table->char('ane_prov_col', 8)->nullable();
            $table->string('car_prov_col', 50)->nullable();
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
        Schema::dropIfExists('proveedor_colaborador');
    }
}
