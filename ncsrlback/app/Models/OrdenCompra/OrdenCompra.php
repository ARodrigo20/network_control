<?php

namespace App\Models\OrdenCompra;

use Illuminate\Database\Eloquent\Model;
use App\Models\Clientes\Cliente;

class OrdenCompra extends Model
{
    protected $table = 'orden_compra';
    protected $fillable = array(
        'ord_com_cod',
        'cotprov_id',
        'id_emp',
        'ord_com_fec',
        'id_col',
        'ord_com_bas_imp',                     
        'ord_com_igv',
        'ord_com_tot',
        'id_pro',
        'ord_com_est',
        'ord_com_prov_id',
        'ord_com_prov_dir',
        'ord_com_prov_con',
        'ord_com_prov_ema',
        'ord_com_term',
        'id_cli',
        'ord_com_tip',
        'ord_med_ent',
        'est_env',
        'est_reg');
    protected $primaryKey = 'id_ord_com';
    protected $appends = ['orden_detalle','usuario','cotizacion_proveedor','proveedor','cliente'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getOrdenDetalleAttribute()
    {
        return $this->orden_detalle();
    }

    public function orden_detalle()
    {
        return $this->hasMany('App\Models\OrdenCompra\OrdenCompraDet', 'id_ord_com')->with(['producto']);
    }

    public function getUsuarioAttribute()
    {
        return $this->usuario();
    }

    public function usuario(){
        return $this->belongsTo('App\User', 'id_col')->select('id_col','email','nom_col','ape_col');
    }

    public function getCotizacionProveedorAttribute()
    {
        return $this->cotizacion_proveedor();
    }

    public function cotizacion_proveedor(){
        return $this->belongsTo('App\Models\CotizacionProveedor\CotizacionProveedor', 'cotprov_id');
    }

    public function getProveedorAttribute()
    {
        return $this->proveedor();
    }

    public function proveedor(){
        return $this->belongsTo('App\Models\Proveedores\Proveedor', 'ord_com_prov_id');
    }

    public function getClienteAttribute()
    {
        return $this->cliente();
    }

    public function cliente()
    {
        return $this->belongsTo('App\Models\Clientes\Cliente','id_cli');
    }

}
