<?php

namespace App\Models\Almacen;
use Illuminate\Database\Eloquent\Model;

class UnidadMedida extends Model
{
    protected $table = 'unidad_medida';
    protected $fillable = array(
                            'nom_unimed',
                            'des_unimed',
                            'est_reg'
                        );
    protected $primaryKey = 'id_unimed';
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}