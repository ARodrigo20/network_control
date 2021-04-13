<?php

namespace App\Models\Facturacion;

use Illuminate\Database\Eloquent\Model;

class GuiaRemisionDet extends Model
{
    protected $table = 'guia_remision_det';
    protected $fillable = array(
        'id_guia_remision_det',
        'id_guia_remision',
        'codigo',
        'descripcion',    
        'unidad',
        'cantidad',
        'codProdSunat',
        'id_prod',
        'est_reg',
    );
    protected $primaryKey = 'id_guia_remision_det';

    protected $appends = ['producto'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getProductoAttribute()
    {
        return $this->producto();
    }

    public function producto(){
        return $this->belongsTo('App\Models\Almacen\Producto', 'id_prod')->with(['unidad_medida','marca']);
    }
  
}
