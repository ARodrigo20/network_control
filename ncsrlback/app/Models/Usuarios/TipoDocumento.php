<?php

namespace App\Models\Usuarios;
use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    protected $table = 'tipo_documento';
    protected $fillable = array(
                            'cod_tipdoc',
                            'des_tipdoc',
                            'est_reg'
                        );
    protected $primaryKey = 'id_tipdoc';

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
