<?php

namespace App\Models\Proveedores;

use Illuminate\Database\Eloquent\Model;

class ProveedorColaborador extends Model
{
    protected $table = 'proveedor_colaborador';
    protected $fillable = array(
                        'nom_prov_col',
                        'ema_prov_col',
                        'tel_prov_col',
                        'id_prov',
                        'ane_prov_col',
                        'car_prov_col',
                        'est_reg'
    );
    protected $primaryKey = 'id_prov_col';

    protected $appends = ['id_proveedor'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getIdProveedorAttribute()
    {
        return $this->id_proveedor();
    }

    public function id_proveedor()
    {
        return $this->belongsTo('App\Models\Proveedores\Proveedor', 'id_prov');
    }

}
