<?php

namespace App\Http\Requests\Proveedores\Proveedor;

use Illuminate\Foundation\Http\FormRequest;

class ProveedorRequest extends FormRequest
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
//           'ema_prov' => 'email',
            'razsoc_prov' => 'required',
            'num_doc_prov' => 'required',
        ];
    }
}
