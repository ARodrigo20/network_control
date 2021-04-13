<?php

namespace App\Models\Almacen;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'producto';
    protected $fillable = array(
                            'cod_prod',
                            'num_parte_prod',
                            'stk_prod',
                            'des_prod',
                            'pre_com_prod',
                            'mon_prod',
                            'id_unimed',
                            'id_mar',
                            'id_mod',
                            'id_fab',
                            'est_reg'
                        );
    protected $primaryKey = 'id_prod';

    protected $appends = ['marca','modelo','fabricante','unidad_medida'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getMarcaAttribute() {
        return $this->marca();
    }
    public function getModeloAttribute() {
        return $this->modelo();
    }
    public function getFabricanteAttribute() {
        return $this->fabricante();
    }
    public function getUnidadMedidaAttribute() {
        return $this->unidad_medida();
    }

    public function marca()
    {
        return $this->belongsTo('App\Models\Almacen\Marca', 'id_mar');
    }
    public function modelo()
    {
        return $this->belongsTo('App\Models\Almacen\Modelo', 'id_mod');
    }
    public function fabricante()
    {
        return $this->belongsTo('App\Models\Almacen\Fabricante', 'id_fab');
    }
    public function unidad_medida()
    {
        return $this->belongsTo('App\Models\Almacen\UnidadMedida', 'id_unimed');
    }
    public function proformaClienteDetalles(){
        return $this->hasMany(ProformaClienteDet::class);
    }

   
}
