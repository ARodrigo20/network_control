<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProveedorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proveedor', function (Blueprint $table) {
            $table->id('id_prov');
            $table->string('razsoc_prov', 100);
            $table->string('ema_prov', 100)->nullable();
            $table->char('num_doc_prov', 11);
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
        Schema::dropIfExists('proveedor');
    }
}
