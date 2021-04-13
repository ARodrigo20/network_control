<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password','nom_col',
        'ape_col',
        'usu_col',
        'pas_col',
        'num_doc_col',
        'cod_col',
        'cel_col',
        'id_tipdoc',
        'id_car',
        'firma',
        'est_reg'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','created_at', 'updated_at',
    ];

    protected $primaryKey = 'id_col';

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['cargo','tipo_documento'];

    public function getCargoAttribute() {
        return $this->cargo();
    }

    public function cargo()
    {
        return $this->belongsTo('App\Models\Usuarios\Cargo', 'id_car');
    }

    public function getTipoDocumentoAttribute()
    {
        return $this->tipo_documento();
    }

    public function tipo_documento()
    {
        return $this->belongsTo('App\Models\Usuarios\TipoDocumento', 'id_tipdoc');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function proformaClientes(){
        return $this->hasMany(ProformaCliente::class);
    }
}
