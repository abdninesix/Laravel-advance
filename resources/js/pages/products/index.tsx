import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: '/products',
  },
];

interface Product {
  id: number, name: string, description: string, price: number, featured_image: string, featured_image_original_name: string, created_at: string,
}

const Index = ({ ...props }: { products: Product[] }) => {

  const { products } = props;
  const { flash } = usePage<{ flash?: { success?: string; error?: string; } }>().props;
  const flashMessage = flash?.success || flash?.error;
  const [toast, setToast] = useState(flashMessage ? flashMessage : false);

  // Set timeout for toast disappearance
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setToast(false); // Hide the toast after 3 seconds
      }, 3000);

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [flashMessage]); // Only re-run when flashMessage changes

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex justify-between'>
          <Link as='button' href={route('products.create')} className='w-fit p-2 bg-blue-500 rounded-lg text-white cursor-pointer'>Create Product</Link>

          {flashMessage && toast && (
            <Alert variant='default' className={`w-fit flex gap-2 ml-auto ${flash?.success ? 'bg-green-500' : 'bg-red-500'}`}>
              <AlertTitle className='text-white font-bold'>{flash.success ? 'Success:' : 'Error:'}</AlertTitle>
              <AlertDescription className='text-white'>{toast}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className='overflow-hidden shadow-lg rounded-xl p-2 '>
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-lg'>
                <th>S.no</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>CreatetAt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th className='p-2 border font-light'>{index + 1}</th>
                  <th className='p-2 border font-light text-left'>{product.name}</th>
                  {product.description ? <th className='p-2 border font-light text-left'>{product.description}</th> : <th className='p-2 border font-light text-left'>No description</th>}
                  <th className='p-2 border font-light'>{product.price}</th>
                  <th className='p-2 border font-light flex justify-center'><img src={`/storage/${product.featured_image}`} alt={product.featured_image_original_name} className='object-contain h-16 w-16' /></th>
                  <th className='p-2 border font-light'>{product.created_at}</th>
                  <th className='p-2 border'>
                    <div className='flex justify-between'>
                      <Link as='button' href={route('products.show', product.id)}><Eye /></Link>
                      <Link as='button' href={route('products.edit', product.id)}><Edit /></Link>
                      <button onClick={() => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          router.delete(route('products.destroy', product.id), { preserveScroll: true })
                        }
                      }}><Trash2Icon /></button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}

export default Index;
