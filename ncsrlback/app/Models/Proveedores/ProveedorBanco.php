<?php

namespace App\Models\Proveedores;

use Illuminate\Database\Eloquent\Model;

class ProveedorBanco extends Model
{
    protected $table = 'proveedor_banco';
    protected $fillable = array(
        'tip_prov_ban',
        'cue_prov_ban',
        'ban_prov_ban',
        'id_prov',
        'com_prov_ban',
        'est_reg'
    );
    protected $primaryKey = 'id_prov_ban';

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
