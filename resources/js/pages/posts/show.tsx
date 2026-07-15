import { Post } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface PostsShowProps {
    post: Post;
}

export default function PostsShow({post}: PostsShowProps) {
    return (
        <AppLayout title={post.title}>
            {post.body}
        </AppLayout>
    )
}