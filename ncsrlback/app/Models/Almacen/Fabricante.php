<?php

namespace App\Models\Almacen;
use Illuminate\Database\Eloquent\Model;

class Fabricante extends Model
{
    protected $table = 'fabricante';
    protected $fillable = array(
                            'des_fab',
                            'est_reg'
                        );
    protected $primaryKey = 'id_fab';
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}