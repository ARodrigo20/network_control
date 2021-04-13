<?php

namespace App\Models\Clientes;
use Illuminate\Database\Eloquent\Model;

class ClienteContacto extends Model
{
    protected $table = 'cliente_contacto';
    protected $fillable = array(
                            'nom_cli_con',
                            'ema_cli_con',
                            'cel_cli_con',
                            'ane_cli_con',
                            'car_cli_con',
                            'id_cli',
                            'est_reg'
                        );
    protected $primaryKey = 'id_cli_con';

    protected $hidden = [
        'created_at', 'updated_at',
    ];

}
