<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProformaClienteDetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proforma_cliente_det', function (Blueprint $table) {
            $table->id('id_prof_det');
            $table->foreignId('id_pro')->nullable()->references('id_pro')->on('proforma_cliente');
            $table->foreignId('id_prod')->nullable()->references('id_prod')->on('producto');
            $table->float('prof_det_can')->nullable();
            $table->float('prof_det_pre_lis')->nullable();
            $table->float('prof_det_imp')->nullable();
            $table->float('prof_det_cos')->nullable();
            $table->float('prof_det_tcos')->nullable();
            $table->float('prof_det_por_com')->nullable();
            $table->float('prof_det_com')->nullable();
            $table->foreignId('id_prov')->nullable()->references('id_prov')->on('proveedor');
            $table->integer('prof_prod_serv')->nullable();
            $table->string('prof_des_prod', 2000)->nullable();
            $table->float('prof_can_prod')->nullable();
            $table->char('prof_det_stock',200)->nullable();
            $table->char('prof_dir_prov',50)->nullable();
            $table->char('prof_ema_prov',50)->nullable();
            $table->foreignId('id_sec')->nullable()->references('id_sec')->on('seccion_pdfs');
            $table->foreignId('id_prov_dir')->nullable()->references('id_prov_dir')->on('proveedor_direccion');
            $table->timestamps();
            $table->char('est_reg', 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('proforma_cliente_det');
    }
}
