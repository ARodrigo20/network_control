<?php

namespace App\Http\Requests\Usuarios\TipoDocumento;

use Illuminate\Foundation\Http\FormRequest;

class TipoDocumentoRequest extends FormRequest
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
            'cod_tipdoc' => 'required',
            'des_tipdoc' => 'required'
        ];
    }
}
