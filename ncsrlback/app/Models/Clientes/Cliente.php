<?php

namespace App\Models\Clientes;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'cliente';
    protected $fillable = array(
                            'razsoc_cli',
                            'numdoc_cli',
                            'ema_cli',
                            'id_tipdoc',
                            'est_reg'
                        );
    protected $primaryKey = 'id_cli';

    protected $appends = ['tipo_documento', 'contactos', 'direcciones', 'proyectos','ordenes_compras'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function getTipoDocumentoAttribute()
    {
        return $this->tipo_documento();
    }

    public function tipo_documento()
    {
        return $this->belongsTo('App\Models\Usuarios\TipoDocumento', 'id_tipdoc');
    }

    public function getContactosAttribute()
    {
        return $this->contactos();
    }

    public function contactos()
    {
        // return $this->hasMany('App\Models\Clientes\ClienteContacto', 'id_cli');
        return $this->hasMany('App\Models\Clientes\ClienteContacto', 'id_cli')->where('est_reg', '!=', 'E');
    }

    public function getProyectosAttribute()
    {
        return $this->proyectos();
    }

    public function proyectos()
    {
        return $this->hasMany('App\Models\Proyecto\Proyecto', 'id_cli')->where('est_reg', '!=', 'E');
    }

    public function getDireccionesAttribute()
    {
        return $this->direcciones();
    }

    public function direcciones()
    {
        return $this->hasMany('App\Models\Clientes\ClienteDireccion', 'id_cli')->where('est_reg', '!=', 'E');
    }

    public function proformaClientes(){
        return $this->hasMany(ProformaCliente::class);
    }

    public function getOrdenesComprasAttribute()
    {
        return $this->ordenes_compras();
    }
    public function ordenes_compras()
    {
        return $this->hasMany('App\Models\OrdenCompra\OrdenCompra', 'id_ord_com');
    }

}
