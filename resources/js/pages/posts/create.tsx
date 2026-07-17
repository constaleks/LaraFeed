import AppLayout from '@/layouts/app-layout';

import { Form } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button";

import InputError from '@/components/input-error';

export default function PostsCreate() {
    return (
        <AppLayout title="Create Post">
            <Form action="/posts" method="post" className="space-y-4">
                {({ errors }) => (
                    <>
                        <div>
                            <Label htmlFor="title" className="mb-2">Title</Label>
                            <Input type="text" id="title" name="title" aria-invalid={!!errors.title} />
                            <InputError message={errors.title} />
                        </div>
                        <div>
                            <Label htmlFor="body" className="mb-2">Body</Label>
                            <Textarea id="body" name="body" aria-invalid={!!errors.body} />
                            <InputError message={errors.body} />
                        </div>
                        <Button type="submit" className="w-full px-3 py-5 cursor-pointer">Create a new post</Button>
                    </>
                )}
            </Form>
        </AppLayout>
    )
}