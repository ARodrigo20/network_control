<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id('id_factura');
            $table->string('tipoDoc', 100)->nullable();
            $table->string('serie', 100)->nullable();
            $table->string('correlativo', 100)->nullable();
            $table->dateTime('fechaEmision')->nullable();
            $table->foreignId('solcli_id')->nullable()->references('solcli_id')->on('solicitud_cotizacion_cliente');
            $table->foreignId('id_cli')->nullable()->references('id_cli')->on('cliente');
            $table->foreignId('id_emp')->nullable()->references('id_emp')->on('empresa');
            $table->string('tipoMoneda', 100)->nullable();
            $table->float('sumOtrosCargos')->nullable();
            $table->float('mtoOperGravadas')->nullable();
            $table->float('mtoOperInafectas')->nullable();
            $table->float('mtoOperExoneradas')->nullable();
            $table->float('mtoOperExportacion')->nullable();
            $table->float('mtoIGV')->nullable();
            $table->float('mtoISC')->nullable();
            $table->float('mtoOtrosTributos')->nullable();
            $table->float('icbper')->nullable();
            $table->float('mtoImpVenta')->nullable();
            $table->foreignId('id_legends')->nullable()->references('id')->on('leyenda_facturas');
            $table->foreignId('id_guias')->nullable()->references('id')->on('guia_facturas');
            $table->foreignId('id_relDocs')->nullable()->references('id')->on('documento_relacionados');
            $table->string('observacion',100)->nullable();
            $table->string('compra')->nullable();
            $table->float('mtoBaseIsc')->nullable();
            $table->float('mtoBaseOth')->nullable();
            $table->float('totalImpuestos')->nullable();
            $table->string('ublVersion',100)->nullable();	
            $table->string('tipoOperacion',100)->nullable();	
            $table->string('fecVencimiento',100)->nullable();	
            $table->float('sumDsctoGlobal')->nullable();	
            $table->float('mtoDescuentos')->nullable();	
            $table->float('mtoOperGratuitas')->nullable();
            $table->float('totalAnticipos')->nullable();
            $table->foreignId('id_guiaEmbebida')->nullable()->references('id')->on('guia_embebidas');
            // $table->foreignId('id_anticipo')->nullable()->references('id')->on('anticipos');
            $table->foreignId('id_seller')->nullable()->references('id')->on('sellers');
            $table->foreignId('id_direccion_entrega')->nullable()->references('id')->on('direccion_entregas');
            // $table->foreignId('id_descuento')->nullable()->references('id')->on('descuentos');
            $table->float('descuentos')->nullable();
            $table->foreignId('id_cargo')->nullable()->references('id')->on('cargos');
            $table->float('mtoCargos')->nullable();	
            $table->float('valorVenta')->nullable();	
            $table->string('observaciones', 20)->nullable();
            $table->char('est_reg', 2);
            $table->char('est_env', 2);
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
        Schema::dropIfExists('facturas');
    }
}
