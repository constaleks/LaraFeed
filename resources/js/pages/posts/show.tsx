import { Post } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface PostsShowProps {
    post: Post;
}

export default function PostsShow({post}: PostsShowProps) {
    return (
        <AppLayout title={post.title}>
            <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-full bg-slate-700" />
                <span className="font-bold text-slate-100">{post.user.name}</span>
            </div>

            <p className="mt-4 text-lg text-slate-100">{post.body}</p>

            <div className="mt-4 border-t border-slate-700/60 pt-3 text-sm text-slate-400">
                {new Date(post.created_at).toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                })}
            </div>
        </AppLayout>
    )
}