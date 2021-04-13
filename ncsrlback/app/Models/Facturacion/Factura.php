<?php

namespace App\Models\Facturacion;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    protected $table = 'facturas';
    protected $fillable = array(
        'id_factura',
        'tipoDoc',
        'serie',
        'correlativo',
        'fechaEmision',
        'solcli_id',
        'id_cli',
        'id_emp',
        'tipoMoneda',
        'sumOtrosCargos',
        'mtoOperGravadas',
        'mtoOperInafectas',
        'mtoOperExoneradas',
        'mtoOperExportacion',
        'mtoIGV',
        'mtoISC',
        'mtoOtrosTributos',
        'icbper',
        'mtoImpVenta',
        'id_legends',
        'id_guias',
        'id_relDocs',
        'observacion',
        'compra',
        'mtoBaseIsc',
        'mtoBaseOth',
        'totalImpuestos',
        'ublVersion',
        'tipoOperacion',
        'fecVencimiento',
        'sumDsctoGlobal',
        'mtoDescuentos',
        'mtoOperGratuitas',
        'totalAnticipos',
        'id_guiaEmbebida',
        'id_seller',
        'id_direccion_entrega',
        'descuentos',
        'id_cargo',
        'mtoCargos',
        'valorVenta',
        'observaciones',
        'est_reg',
        'est_env',

    );
    protected $primaryKey = 'id_factura';

    protected $appends = ['cliente', 'factura_det', ];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getClienteAttribute()
    {
        return $this->cliente();
    }

    public function cliente(){
        return $this->belongsTo('App\Models\Clientes\Cliente', 'id_cli')->with(['tipo_documento']);
    }

    public function getFacturaDetAttribute()
    {
        return $this->factura_det();
    }

    public function factura_det(){
        return $this->hasMany('App\Models\Facturacion\FacturaDetalle', 'id_factura')->with(['producto'])->where('est_reg', '!=', 'E');
    }
}
