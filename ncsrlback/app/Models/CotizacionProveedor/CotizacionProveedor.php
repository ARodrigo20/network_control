<?php

namespace App\Models\CotizacionProveedor;
use Illuminate\Database\Eloquent\Model;

class CotizacionProveedor extends Model
{
    protected  $table = 'cotizacion_proveedor';
    protected  $fillable = array(
                            'solcli_id',
                            'id_proy',
                            'id_cli',
                            'id_prov',
                            'cotprov_fec',
                            'cotprov_razsoc',
                            'cotprov_ruc',
                            'cotprov_tipdoc',
                            'cotprov_dir',
                            'cotprov_con',
                            'cotprov_ema',
                            'est_reg',
                            'est_env',
                            'cotprov_cod',
                            'id_col',
                            'cotprov_col_nom',
                            'cotprov_col_usu'
                        );
    protected  $primaryKey = "cotprov_id";

    protected $appends = ['proyecto','cotizacion_detalle'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getCotizacionDetalleAttribute()
    {
        return $this->cotizacion_detalle();
    }

    public function cotizacion_detalle()
    {
        return $this->hasMany('App\Models\CotizacionProveedor\CotizacionProveedorDetalle', 'cotprov_id')->with(['producto']);
    }
    public function getProyectoAttribute()
    {
        return $this->proyecto();
    }

    public function proyecto()
    {
        return $this->belongsTo('App\Models\Proyecto\Proyecto', 'id_proy');
    }
    public function getCotizacionClienteAttribute()
    {
        return $this->cotizacionCliente();
    }

    public function cotizacionCliente()
    {
        return $this->belongsTo('App\Models\CotizacionCliente\CotizacionCliente', 'solcli_id');
    }

}
