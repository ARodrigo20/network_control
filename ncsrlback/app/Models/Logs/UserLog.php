<?php

namespace App\Models\Logs;
use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    protected $table = 'users';
    protected $fillable = [
        'name', 'email', 'est_reg'
    ];

    protected $hidden = ['remember_token', 'email_verified_at', 'created_at', 'updated_at',
        'password',
        'ape_col',
        'usu_col',
        'pas_col',
        'num_doc_col',
        'id_tipdoc',
        'id_car',
        'est_reg'
    ];

    protected $primaryKey = 'id_col';
}