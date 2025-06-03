
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Create a new product',
    href: '/products',
  },
];

const Create = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Product" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

        <div>
          Hi
        </div>

      </div>
    </AppLayout>
  )
}

export default Create