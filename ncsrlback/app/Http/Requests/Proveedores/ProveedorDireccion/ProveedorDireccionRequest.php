<?php
namespace App\Http\Requests\Proveedores\ProveedorDireccion;

use Illuminate\Foundation\Http\FormRequest;

class ProveedorDireccionRequest extends FormRequest
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
            'ciu_prov' => 'required',
            'dir_prov' => 'required'
            
        ];
    }
}
