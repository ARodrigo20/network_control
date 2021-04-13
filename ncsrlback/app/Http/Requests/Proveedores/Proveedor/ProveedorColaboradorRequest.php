<?php

namespace App\Http\Requests\Proveedores\Proveedor;

use Illuminate\Foundation\Http\FormRequest;

class ProveedorColaboradorRequest extends FormRequest
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
//          'ema_prov_col' => 'email',
            'nom_prov_col' => 'required',
//          'tel_prov_col' => 'required',
//          'ane_prov_col' => 'required',
//          'car_prov_col' => 'required',
            'id_prov' => 'required',
        ];
    }




}
