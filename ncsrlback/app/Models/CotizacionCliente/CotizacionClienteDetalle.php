<?php

namespace App\Models\CotizacionCliente;
use Illuminate\Database\Eloquent\Model;

class CotizacionClienteDetalle extends Model
{
    protected $table = 'solicitud_cotizacion_cliente_det';
    protected $fillable = array(
                            'solcli_id',
                            'solclidet_prod_serv',
                            'solclidet_des',
                            'id_prod',
                            'solclidet_prod_can',
                            'solclidet_prod_codint',
                            'solclidet_prod_numpar',
                            'solclidet_prod_fabr',
                            'solclidet_prod_marc',
                            'solclidet_prod_unimed',
                            'solclidet_prod_stock',
                            'est_reg'
                        );
    protected $primaryKey = 'solclidet_id';
    public $timestamps = false;
}
