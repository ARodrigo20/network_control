<?php

namespace App\Models\Proyecto;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $table = 'proyecto';
    protected $fillable = array(
                        'nom_proy',
                        'ser_proy',
                        'num_proy',
                        'id_cli',
                        'est_reg'
    );
    protected $primaryKey = 'id_proy';

    protected $appends = ['cliente'];
    protected $hidden = [
        'created_at', 'updated_at',
    ];
    
    public function getClienteAttribute()
	    {
	    	return $this->cliente();
	    }

	    public function cliente()
	    {
	    	return $this->belongsTo('App\Models\Clientes\Cliente', 'id_cli');
        }
    public function proformaClientes(){
        return $this->hasMany(ProformaCliente::class);
    }
}
