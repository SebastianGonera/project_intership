<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AcquisitionChannelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules =[
            'amount' => 'required|numeric|min:1',
        ];
        if($this->isMethod('post')){
            $rules['name'] = 'required|string|max:255|unique:acquisition_channels,name';
        }

        return $rules;
    }
}
