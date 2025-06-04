
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: '/products',
  },
];

const Index = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

        <Link as='button' href={route('products.create')} className='w-fit p-2 text-blue-500 cursor-pointer'>Create Product</Link>
        
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
              <tr>
                <th>1</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>CreatetAt</th>
                <th>Actions</th>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </AppLayout>
  )
}

export default Index