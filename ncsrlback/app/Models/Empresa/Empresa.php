<?php

namespace App\Models\Empresa;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresa';
    protected $fillable = array(
                            'id_emp',
                            'nom_emp',
                            'numdoc_emp',
                            'dir_emp',
                            'dis_emp',
                            'ciu_emp',
                            'tel_emp',
                            'cel_emp',
                            'codciu_emp',
                            'img_emp',
                            'imgext_emp',
                            'id_tipdoc',
                        );
    protected $primaryKey = 'id_emp';

    protected $appends = ['tipo_documento'];
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
}
