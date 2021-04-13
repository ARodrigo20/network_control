<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orden_compra', function (Blueprint $table) {
            $table->id('id_ord_com');
            $table->string('ord_com_cod', 20)->unique();
            $table->foreignId('cotprov_id')->nullable()->references('cotprov_id')->on('cotizacion_proveedor');
            $table->integer('ord_com_prov_id')->nullable();
            $table->string('ord_com_prov_dir', 200)->nullable();
            $table->string('ord_com_prov_con', 200)->nullable();
            $table->string('ord_com_prov_ema', 200)->nullable();
            $table->string('ord_com_term', 50)->nullable();
            $table->foreignId('id_emp')->nullable()->references('id_emp')->on('empresa');
            $table->dateTime('ord_com_fec')->nullable();
            $table->foreignId('id_col')->nullable()->references('id_col')->on('users');
            $table->float('ord_com_bas_imp')->nullable();
            $table->float('ord_com_igv')->nullable();
            $table->float('ord_com_tot')->nullable();
            $table->foreignId('id_pro')->nullable()->references('id_pro')->on('proforma_cliente');
            $table->char('ord_com_est', 1)->nullable();
            $table->char('est_env', 1)->nullable();
            $table->char('est_reg', 2);
            $table->timestamps();
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
            $table->char('ord_com_tip', 1)->nullable();
            $table->string('ord_med_ent', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orden_compra');
    }
}
