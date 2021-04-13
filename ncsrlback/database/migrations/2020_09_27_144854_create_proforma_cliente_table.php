<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProformaClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proforma_cliente', function (Blueprint $table) {
            $table->id('id_pro');
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
            $table->dateTime('prof_fec')->nullable();
            $table->char('prof_mon', 1)->nullable();
            $table->foreignId('id_proy')->nullable()->references('id_proy')->on('proyecto');
            $table->foreignId('id_col')->nullable()->references('id_col')->on('users');
            $table->foreignId('solcli_id')->nullable()->references('solcli_id')->on('solicitud_cotizacion_cliente');
            $table->integer('prof_cre')->nullable();
            $table->float('prof_imp_ini')->nullable();
            $table->float('prof_int')->nullable();
            $table->integer('prof_cuo')->nullable();
            $table->char('prof_val', 20)->nullable();
            $table->char('prof_tie_ent', 20)->nullable();
            $table->float('prof_cos_dir')->nullable();
            $table->float('prof_gas_ind')->nullable();
            $table->float('prof_uti')->nullable();
            $table->float('prof_bas_imp')->nullable();
            $table->float('prof_igv')->nullable();
            $table->float('prof_neto')->nullable();
            $table->float('prof_fac')->nullable();
            $table->float('prof_finan')->nullable();
            $table->float('prof_val_cuo')->nullable();
            $table->char('prof_obs',200)->nullable();
            $table->float('prof_desc')->nullable();
            $table->integer('prof_cli_id_dir')->nullable();
            $table->integer('prof_cli_id_con')->nullable();
            $table->integer('prof_cli_ciu')->nullable();
            $table->char('prof_cod', 20)->nullable();
            $table->char('est_reg', 2);
            $table->char('est_env', 1)->nullable();
            $table->char('prof_tie_ins', 20)->nullable();
            $table->char('prof_con_pag', 100)->nullable();
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
        Schema::dropIfExists('proforma_cliente');
    }
}
