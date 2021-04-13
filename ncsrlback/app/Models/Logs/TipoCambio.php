<?php

namespace App\Models\Logs;
use Illuminate\Database\Eloquent\Model;

class TipoCambio extends Model
{
    protected $table = 'tipo_cambio';
    protected $fillable = array(
                            'id_tipcam',
                            'des_tipcam'
                        );
    protected $primaryKey = 'id_tipcam';
}