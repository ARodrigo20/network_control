<?php

namespace App\Models\Usuarios;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = array(
        'email','nom_col',
        'ape_col');
    protected $primaryKey = 'id_col';

    protected $hidden = [
        'password', 'remember_token','created_at', 'updated_at',
    ];
}