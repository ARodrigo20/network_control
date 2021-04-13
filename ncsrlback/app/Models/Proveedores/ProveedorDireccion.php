<?php

namespace App\Models\Proveedores;

use Illuminate\Database\Eloquent\Model;

class ProveedorDireccion extends Model
{
    protected $table = 'proveedor_direccion';
    protected $fillable = array(
                        'ciu_prov',
                        'dir_prov',
                        'tel_prov',
                        'id_prov',
                        'est_reg'
                    );
    protected $primaryKey = 'id_prov_dir';

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
