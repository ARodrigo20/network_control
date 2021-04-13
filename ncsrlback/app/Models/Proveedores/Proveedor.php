<?php

namespace App\Models\Proveedores;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
        protected $table = 'proveedor';
        protected $fillable = array(
                            'razsoc_prov',
                            'ema_prov',
                            'num_doc_prov',
                            'id_tipdoc',
                            'est_reg'
                        );
        protected $primaryKey = 'id_prov';

    	protected $appends = ['tipo_documento', 'bancos','colaboradores','direcciones'];
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

	    public function getBancosAttribute()
        {
            return $this->bancos();
        }
        public function bancos()
        {
            return $this->hasMany('App\Models\Proveedores\ProveedorBanco', 'id_prov')->where('est_reg', '!=', 'E');
        }

        public function getColaboradoresAttribute()
        {
            return $this->colaboradores();
        }

        public function colaboradores()
        {
            return $this->hasMany('App\Models\Proveedores\ProveedorColaborador', 'id_prov')->where('est_reg', '!=', 'E');
        }

        public function getDireccionesAttribute()
        {
            return $this->direcciones();
        }
        public function direcciones(){
            return $this->hasMany('App\Models\Proveedores\ProveedorDireccion', 'id_prov')->where('est_reg', '!=', 'E');
        }

        public function proformaClienteDetalles(){
            return $this->hasMany(ProformaClienteDet::class);
        }


}
