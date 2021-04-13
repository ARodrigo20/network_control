<?php

namespace App\Models\Almacen;
use Illuminate\Database\Eloquent\Model;

class Modelo extends Model
{
    protected $table = 'modelo';
    protected $fillable = array(
                            'des_mod',
                            'est_reg'
                        );
    protected $primaryKey = 'id_mod';
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}