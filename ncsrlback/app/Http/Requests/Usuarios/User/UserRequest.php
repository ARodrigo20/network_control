<?php

namespace App\Http\Requests\Usuarios\User;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'email' => 'required|email',
            'nom_col' => 'required',
            'ape_col' => 'required',
            'num_doc_col' => 'required',
            'cod_col' => 'required'
        ];
    }
}
