<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get()->map(fn($product) => [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'featured_image' => $product->featured_image,
            'featured_image_original_name' => $product->featured_image_original_name,
            'created_at' => $product->created_at->format('d M Y'),
        ]);
        return Inertia::render('products/index', ['products' => $products,]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductFormRequest $request)
    {
        try {
            $image = null;

            if ($request->file('featured_image')) {
                $image = $request->file('featured_image');
                $imageOriginalName = $image->getClientOriginalName();
                $image = $image->store('products', 'public');
            }

            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'featured_image' => $image,
                'featured_image_original_name' => $imageOriginalName,
            ]);

            if ($product) {
                return redirect()->route('products.index')->with('success', 'Product created successfully');
            }
            return redirect()->back()->with('error', 'Product failed to create');
        } catch (Exception $e) {
            Log::error('Product creation controller error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/create', ['product' => $product, 'isView' => true,]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('products/create', ['product' => $product, 'isEdit' => true,]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $product)
    {
        if ($product) {
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            if ($request->file('featured_image')) {
                $image = $request->file('featured_image');
                $imageOriginalName = $image->getClientOriginalName();
                $image = $image->store('products', 'public');

                $product->featured_image = $image;
                $product->featured_image_original_name = $imageOriginalName;
            }
            $product->save();
            return redirect()->route('products.index')->with('success', 'Product updated successfully');
        }
            return redirect()->back()->with('error', 'Product failed to update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product) {
            $product->delete();
            return redirect()->back()->with('success', 'Product deleted');
        }
            return redirect()->back()->with('error', 'Product failed to delete');
    }
}
