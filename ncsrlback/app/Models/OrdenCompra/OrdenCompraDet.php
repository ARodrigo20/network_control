<?php

namespace App\Models\OrdenCompra;

use Illuminate\Database\Eloquent\Model;

class OrdenCompraDet extends Model
{
    protected $table = 'orden_compra_det';
    protected $fillable = array(
        'id_ord_com',
        'id_prod',
        'ord_com_det_numpar',
        'ord_com_det_fab',
        'ord_com_det_des',                     
        'ord_com_det_can',
        'ord_com_det_unimed',
        'ord_com_det_preuni',
        'ord_com_det_est',
        'ord_com_det_feclleg',
        'ord_com_det_canent',
        'ord_com_det_canfal',
        'ord_com_prod_serv');

    protected $primaryKey = 'id_ord_det';
    public $timestamps = false;
    protected $appends = ['producto'];

    public function getProductoAttribute()
    {
        return $this->producto();
    }

    public function producto(){
        return $this->belongsTo('App\Models\Almacen\Producto', 'id_prod');
    }
}