<?php

namespace App\Models\Almacen;
use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $table = 'marca';
    protected $fillable = array(
                            'des_mar',
                            'est_reg'
                        );
    protected $primaryKey = 'id_mar';
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}