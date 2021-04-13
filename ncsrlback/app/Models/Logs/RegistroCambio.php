<?php

namespace App\Models\Logs;
use Illuminate\Database\Eloquent\Model;

class RegistroCambio extends Model
{
    protected $table = 'registro_cambio';
    protected $fillable = array(
                            'des_regcam',
                            'id_col',
                            'id_tipcam',
                            'det_regcam'
                        );
    protected $primaryKey = 'id_regcam';

    protected $appends = ['users','tipo_cambio'];
    protected $hidden = ['updated_at'];

    public function getUsersAttribute() {
        return $this->users();
    }
    public function getTipoCambioAttribute() {
        return $this->tipo_cambio();
    }

    public function users()
    {
        return $this->belongsTo('App\User', 'id_col')->select('id_col','email','nom_col','ape_col');
    }
    // public function usuario(){
    //     return $this->belongsTo('App\User', 'id_col')->select('id_col','email','nom_col','ape_col');
    // }
    public function tipo_cambio()
    {
        return $this->belongsTo('App\Models\Logs\TipoCambio', 'id_tipcam');
    }
}