<?php

namespace App\Models\CotizacionCliente;
use Illuminate\Database\Eloquent\Model;

class CotizacionCliente extends Model
{
    protected $table = 'solicitud_cotizacion_cliente';
    protected $fillable = array(
                            'solcli_cod',
                            'solcli_fec',
                            'id_proy',
                            'solcli_proy_nom',
                            'solcli_proy_cod',
                            'id_cli',
                            'solcli_cli_nom',
                            'solcli_cli_numdoc',
                            'solcli_cli_tipdoc',
                            'solcli_cli_dir',
                            'solcli_cli_id_dir',
                            'solcli_cli_con',
                            'solcli_cli_id_con',
                            'id_col',
                            'solcli_col_nom',
                            'est_reg'
                        );
    protected $primaryKey = 'solcli_id';

    protected $appends = ['cotizacion_detalle'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getCotizacionDetalleAttribute()
    {
        return $this->cotizacion_detalle();
    }

    public function cotizacion_detalle()
    {
        return $this->hasMany('App\Models\CotizacionCliente\CotizacionClienteDetalle', 'solcli_id');
    }

}
