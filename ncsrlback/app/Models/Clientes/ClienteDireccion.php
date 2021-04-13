<?php

namespace App\Models\Clientes;
use Illuminate\Database\Eloquent\Model;

class ClienteDireccion extends Model
{
    protected $table = 'cliente_direccion';
    protected $fillable = array(
                            'ciu_cli',
                            'dir_cli',
                            'tel_cli',
                            'id_cli',
                            'est_reg'
                        );
    protected $primaryKey = 'id_cli_dir';

    protected $hidden = [
        'created_at', 'updated_at',
    ];

}
