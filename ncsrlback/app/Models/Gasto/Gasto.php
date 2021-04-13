<?php

namespace App\Models\Gasto;

use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    protected $table = 'gasto';
    protected $fillable = array(
        'gas_fec',
        'gas_fac',
        'gas_subtot',
        'gas_igv',
        'gas_tot',
        'id_prov',                     
        'prov_razsoc',
        'prov_ruc',
        'id_proy',
        'gas_mon',
        'gas_tipcam',
        'gas_totdol',
        'gas_desc',
        'gas_fac_ser',
        'est_reg');
    protected $primaryKey = 'id_gas';

    //protected $appends = ['orden_detalle'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];
    /*public function getMarcaAttribute() {
        return $this->marca();
    }
    public function marca()
    {
        return $this->belongsTo('App\Models\Almacen\Marca', 'id_mar');
    }*/

/*    public function getOrdenDetalleAttribute()
    {
        return $this->orden_detalle();
    }

    public function orden_detalle()
    {
        return $this->hasMany('App\Models\OrdenCompra\OrdenCompraDet', 'id_ord_com');
    }
*/
}
