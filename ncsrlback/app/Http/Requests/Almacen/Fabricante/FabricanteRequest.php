<?php

namespace App\Http\Requests\Almacen\Fabricante;

use Illuminate\Foundation\Http\FormRequest;

class FabricanteRequest extends FormRequest
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
            'des_fab' => 'required'
        ];
    }
}
