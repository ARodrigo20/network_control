<?php

namespace App\Models\Facturacion;

use Illuminate\Database\Eloquent\Model;

class FacturaDetalle extends Model
{
    protected $table = 'factura_detalles';
    protected $fillable = array(
        'id_det_fac',
        'unidad',
        'cantidad',
        'codProducto',
        'codProdSunat',
        'codProdGS1',
        'descripcion',
        'mtoValorUnitario',
        'descuento',
        'igv',
        'tipAfeIgv',
        'isc',
        'tipSisIsc',
        'totalImpuestos',
        'mtoPrecioUnitario',
        'mtoValorVenta',
        'mtoValorGratuito',
        'mtoBaseIgv',
        'porcentajeIgv',
        'mtoBaseIsc',
        'porcentajeIsc',
        'mtoBaseOth',
        'porcentajeOth',
        'otroTributo',
        'icbper',
        'factorIcbper',
        'est_reg',
        'id_factura',
        'id_prod',
    );
    protected $primaryKey = 'id_det_fac';

    protected $appends = ['producto'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];
    public function getProductoAttribute()
    {
        return $this->producto();
    }

    public function producto()
    {
        return $this->belongsTo('App\Models\Almacen\Producto', 'id_prod')->with(['unidad_medida', 'marca']);
    }

}
