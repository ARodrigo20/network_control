<?php

namespace App\Models\Facturacion;

use Illuminate\Database\Eloquent\Model;

class Pagos extends Model
{
    protected $table = 'pagos';
    protected $fillable = array(
        'id_pagos',
        'id_factura',
        'medio_pago',
        'fechaPago',
        'monto',
        'referencia',
        'est_reg',

    );
    protected $primaryKey = 'id_pagos';

    protected $appends = ['facturas'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
