<?php

namespace App\Models\Facturacion;

use Illuminate\Database\Eloquent\Model;

class Envio extends Model
{
    protected $table = 'envio';
    protected $fillable = array(
        'id_envio',
        'codTraslado',
        'desTraslado',
        'indTransbordo',
        'pesoTotal',
        'undPesoTotal',
        'numBultos', 
        'modTraslado',
        'fecTraslado',
        'numContenedor',
        'codPuerto', 
        'id_transportista',
        'ubigueoLlegada',
        'direccionLlegada',
        'ubigueoSalida',
        'direccionSalida',
        'est_reg'
        
    );
    protected $primaryKey = 'id_envio';

    protected $appends = ['transportista'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getTransportistaAttribute()
    {
        return $this->transportista();
    }

    public function transportista(){
        return $this->belongsTo('App\Models\Facturacion\Transportista', 'id_transportista');
    }


}
