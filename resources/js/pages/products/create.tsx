
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MyTextarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const Create = ({ ...props }) => {

    const { product, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Here is' : isEdit ? 'Edit' : 'Create'} your product`,
            href: route('products.create'),
        },
    ];
    const { data, setData, processing, post, put, errors, reset } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        featured_image: null as File | null
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (isEdit) {
            put(route('products.update', product.id), {
                onSuccess: () => {console.log('Form updated'), reset()}
            });
        } else {
            post(route('products.store'), {
                onSuccess: () => {console.log('Form submitted'), reset()}
            });
        }
    };

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setData('featured_image', e.target.files[0])
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link as='button' href={route('products.index')} className='w-fit p-2 text-blue-500 cursor-pointer'>Back</Link>
                <Card>
                    <CardHeader>
                        <CardTitle>{isView ? 'View only' : isEdit ? 'Edit' : 'Create'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='off'>
                            <div className='grid gap-6'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='name'>Name:</Label>
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} id='name' name='name' type='text' placeholder='Product title' autoFocus tabIndex={1} disabled={isView || processing} />
                                    <InputError message={errors.name} />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='desctiption'>Desctiption:</Label>
                                    <MyTextarea value={data.description} onChange={(e) => setData('description', e.target.value)} id='desctiption' name='description' placeholder='Product description' autoFocus tabIndex={2} rows={3} disabled={isView || processing} />
                                    <InputError message={errors.description} />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='price'>Price:</Label>
                                    <Input value={data.price} onChange={(e) => setData('price', e.target.value)} id='price' name='price' type='text' placeholder='Product price' autoFocus tabIndex={3} disabled={isView || processing} />
                                    <InputError message={errors.price} />
                                </div>
                                {!isView &&
                                    (<div className='grid gap-2'>
                                        <Label htmlFor='featured_image'>Image:</Label>
                                        <Input onChange={handleFile} id='featured_image' name='featured_image' type='file' autoFocus tabIndex={4} disabled={processing} />
                                        <InputError message={errors.featured_image} />
                                    </div>)}
                                {(isView || isEdit) &&
                                    (<div>
                                        <Label>Current image:</Label>
                                        <img src={`/storage/${product.featured_image}`} alt={product.featured_image_original_name} className='object-contain w-52' />
                                    </div>)}
                                {!isView &&
                                    (<Button type="submit" className="mt-4 w-fit" tabIndex={5} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        {isEdit ? 'Update' : 'Create'}
                                    </Button>)}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default Create