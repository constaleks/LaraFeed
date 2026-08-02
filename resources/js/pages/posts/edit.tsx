import AppLayout from '@/layouts/app-layout';

import { Form } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button";
import InputError from '@/components/input-error';

import { update } from '@/actions/App/Http/Controllers/PostController';
import { Post } from '@/types';

interface PostsEditProps {
    post: Post;
}

export default function PostsCreate({ post }: PostsEditProps) {
    return (
        <AppLayout title="Edit Post">
            <Form action={update(post.id)} className="space-y-4">
                {({ errors }) => (
                    <>
                        <div>
                            <Label htmlFor="title" className="mb-2">Title</Label>
                            <Input type="text" id="title" name="title" aria-invalid={!!errors.title} defaultValue={post.title} />
                            <InputError message={errors.title} />
                        </div>
                        <div>
                            <Label htmlFor="body" className="mb-2">Body</Label>
                            <Textarea id="body" name="body" aria-invalid={!!errors.body} defaultValue={post.body} />
                            <InputError message={errors.body} />
                        </div>
                        <Button type="submit" className="w-full px-3 py-5 cursor-pointer">Edit the post</Button>
                    </>
                )}
            </Form>
        </AppLayout>
    )
}