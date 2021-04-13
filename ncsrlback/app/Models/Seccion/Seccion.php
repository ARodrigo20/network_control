<?php

namespace App\Models\Seccion;
use Illuminate\Database\Eloquent\Model;

class Seccion extends Model
{
    protected $table = 'seccion_pdfs';
    protected $fillable = array(
                            
                            'des_sec',
                            'est_reg',
                        );
    protected $primaryKey = 'id_sec';

    
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    // public function proformaClienteDetalles(){
    //     return $this->hasMany(ProformaClienteDet::class);
    // }

}
