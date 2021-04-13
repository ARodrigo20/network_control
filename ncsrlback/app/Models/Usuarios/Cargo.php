<?php

namespace App\Models\Usuarios;
use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $table = 'cargo';
    protected $fillable = array(
                            'des_car',
                            'est_reg'
                        );
    protected $primaryKey = 'id_car';

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}