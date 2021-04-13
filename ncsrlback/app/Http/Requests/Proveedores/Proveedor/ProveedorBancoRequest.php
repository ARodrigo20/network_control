<?php

namespace App\Http\Requests\Proveedores\Proveedor;

use Illuminate\Foundation\Http\FormRequest;

class ProveedorBancoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
/*
            'tip_prov_ban' => 'required',
            'cue_prov_ban' => 'required',
            'ban_prov_ban' => 'required',
            'com_prov_ban' => 'required',
*/
            'id_prov' => 'required',
        ];
    }

}

?>
