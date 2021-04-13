<?php

namespace App\Models\Kardex;

use Illuminate\Database\Eloquent\Model;

class Kardex extends Model
{
    protected $table = 'kardex';
    protected $fillable = array(
        'fec_kar',
        'cod_kar',
        'id_ord_det',
        'id_ord_com',
        'prod_desc',
        'prod_numpar',                     
        'prod_unimed',
        'prod_cant',
        'prov_razsoc',
        'fac_kar',
        'guirem_kar',
        'bol_kar',
        'tip_kar',
        'id_col',
        'col_usu',
        'est_reg');
    protected $primaryKey = 'id_kar';

    //protected $appends = ['orden_detalle'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

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
