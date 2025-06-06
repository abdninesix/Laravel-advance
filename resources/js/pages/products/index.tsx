import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: '/products',
  },
];

const Index = ({ products }: { products: any[] }) => {
  // Get flash message from Inertia
  const { flash } = usePage<{ flash?: { success?: string; error?: string; } }>().props;
  const flashMessage = flash?.success || flash?.error;

  // State for the toast message
  const [toast, setToast] = useState(flashMessage ? true : false);

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
        <div className='flex'>
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
                  <th>{index + 1}</th>
                  <th>{product.name}</th>
                  <th>{product.description}</th>
                  <th>{product.price}</th>
                  <th><img src={product.featured_image} alt={product.name} className='object-cover size-12' /></th>
                  <th>{new Date(product.created_at).toLocaleDateString()}</th>
                  <th>Edit and delete</th>
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
