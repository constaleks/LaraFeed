import { Post } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface PostsShowProps {
    post: Post;
}

export default function PostsShow({post}: PostsShowProps) {
    return (
        <AppLayout title={post.title}>
            <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-full bg-muted" />
                <span className="font-bold">{post.user.name}</span>
            </div>

            <p className="mt-4 text-lg">{post.body}</p>

            <div className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                })}
            </div>
        </AppLayout>
    )
}