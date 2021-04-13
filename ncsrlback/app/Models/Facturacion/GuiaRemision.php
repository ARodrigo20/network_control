<?php

namespace App\Models\Facturacion;

use Illuminate\Database\Eloquent\Model;

class GuiaRemision extends Model
{

    protected $table = 'guia_remision';
    protected $fillable = array(
        'id_guia_remision',
        'tipoDoc',
        'serie',
        'correlativo',
        'observacion',
        'fechaEmision',
        'id_emp',
        'id_cli',
        'id_envio',
        'observaciones',
        'solcli_id',
        'est_env',

    );
    protected $primaryKey = 'id_guia_remision';

    protected $appends = ['cliente', 'guia_remision_det', 'envio', 'solicitud_cotizacion_cliente'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getClienteAttribute()
    {
        return $this->cliente();
    }

    public function cliente(){
        return $this->belongsTo('App\Models\Clientes\Cliente', 'id_cli');
    }

    public function getEnvioAttribute()
    {
        return $this->cliente();
    }

    public function envio(){
        return $this->belongsTo('App\Models\Facturacion\Envio', 'id_envio')->with(['transportista']);
    }

    public function getGuiaRemisionDetAttribute()
    {
        return $this->guia_remision_det();
    }

    public function guia_remision_det(){
        return $this->hasMany('App\Models\Facturacion\GuiaRemisionDet', 'id_guia_remision')->with(['producto'])->where('est_reg', '!=', 'E');
    }

    public function getSolicitudCotizacionClienteAttribute()
    {
        return $this->solicitud_cotizacion();
    }

    public function solicitud_cotizacion(){
        return $this->belongsTo('App\Models\CotizacionCliente\CotizacionCliente', 'solcli_id');
    }

}
