import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Form } from '@inertiajs/react';

export default function PostsCreate() {
    return (
        <AppLayout title="Create Post">
            <Form action="/posts" method="post" className="space-y-4">
                {({ errors }) => (
                    <>
                        <div>
                            <label htmlFor="title" className="block mb-2 text-lg">Title</label>
                            <input type="text" id="title" name="title" className={cn("w-full rounded-md px-3 py-2 bg-slate-600/50 backdrop-blur-md", errors.title && "border border-red-300")} />
                            {errors.title && <p className="text-red-300 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="body" className="block mb-2 text-lg">Body</label>
                            <textarea id="body" name="body" className={cn("w-full rounded-md px-3 py-2 bg-slate-600/50 backdrop-blur-md", errors.body && "border border-red-300")}></textarea>
                            {errors.body && <p className="text-red-300 text-sm mt-1">{errors.body}</p>}
                        </div>
                        <button type="submit" className="w-full px-3 py-2 text-lg rounded-full transition-colors bg-slate-600/50 hover:bg-slate-500/50 cursor-pointer">Create a new post</button>
                    </>
                )}
            </Form>
        </AppLayout>
    )
}