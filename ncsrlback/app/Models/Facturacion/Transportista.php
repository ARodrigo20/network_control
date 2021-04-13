<?php

namespace App\Models\Facturacion;

use Illuminate\Database\Eloquent\Model;

class Transportista extends Model
{
    protected $table = 'transportista';
    protected $fillable = array(
      
            'id_transportista',
            'TipoDoc', 
            'NumDoc',
            'RznSocial', 
            'Placa', 
            'ChoferTipoDoc',
            'ChoferDoc',
            'est_reg'
    );

    protected $primaryKey = 'id_transportista';
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
