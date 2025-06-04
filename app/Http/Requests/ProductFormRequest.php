<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:20',
            'description' => 'required|string|max:300',
            'price' => 'required|numeric|min:',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Fix the name',
            'name.string' => 'Fix the name',
            'name.max' => 'Fix the name limit',
            'description.required' => 'Fix the desctiption',
            'description.string' => 'Fix the desctiption',
            'description.max' => 'Fix the desctiption limit',
            'price.required' => 'Fix the price',
            'price.numeric' => 'Fix the price number only',
            'price.min' => 'Fix the price',
            'image.image' => 'Fix the image file',
            'image.mimes' => 'Fix the image format',
            'image.max' => 'Fix the image size 2mb',
        ];
    }
}
