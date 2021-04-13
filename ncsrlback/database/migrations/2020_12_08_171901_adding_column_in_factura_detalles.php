<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddingColumnInFacturaDetalles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('factura_detalles', function (Blueprint $table) {
            
            $table->string('unidad')->nullable();           
            $table->float('cantidad')->nullable();
            $table->string('codProducto')->nullable();
            $table->string('codProdSunat')->nullable();
            $table->string('codProdGS1')->nullable();
            $table->string('descripcion')->nullable();	
            $table->float('mtoValorUnitario')->nullable();	
            $table->float('descuento')->nullable();	
            $table->float('igv')->nullable();	
            $table->string('tipAfeIgv')->nullable();	
            $table->float('isc')->nullable();	
            $table->string('tipSisIsc')->nullable();	
            $table->float('totalImpuestos')->nullable();	
            $table->float('mtoPrecioUnitario')->nullable();	
            $table->float('mtoValorVenta')->nullable();	
            $table->float('mtoValorGratuito')->nullable();	
            $table->float('mtoBaseIgv')->nullable();	
            $table->float('porcentajeIgv')->nullable();	
            $table->float('mtoBaseIsc')->nullable();	
            $table->float('porcentajeIsc')->nullable();	
            $table->float('mtoBaseOth')->nullable();	
            $table->float('porcentajeOth')->nullable();	
            $table->float('otroTributo')->nullable();	
            $table->float('icbper')->nullable();	
            $table->float('factorIcbper')->nullable();
            $table->char('est_reg', 2);	
            $table->foreignId('id_factura')->nullable()->references('id_factura')->on('facturas');
            $table->foreignId('id_prod')->nullable()->references('id_prod')->on('producto');
            // cargos	[...]
            // descuentos	[...]
            // atributos	[...]
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('factura_detalles', function (Blueprint $table) {
            //
        });
    }
}
