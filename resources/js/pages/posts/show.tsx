import { Post } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import CommentForm from '@/components/comments/comment-form';
import CommentCard from '@/components/comments/comment-card';

interface PostsShowProps {
    post: Post;
}

export default function PostsShow({post}: PostsShowProps) {
    return (
        <AppLayout title={post.title}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="h-11 w-11 shrink-0 rounded-full bg-muted" />
                            {post.user?.name}
                        </div>
                    </CardTitle>
                    <CardDescription>
                        {new Date(post.created_at).toLocaleString("en-US", {
                            dateStyle: "long",
                            timeStyle: "short",
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {post.body}
                </CardContent>
            </Card>

            <CommentForm post={post} />

            <div>
                {post.comments && post.comments.length > 0 ? (
                    <div className="space-y-4">
                        {post.comments.map((comment) => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-8">No comments yet.</p>
                )}
            </div>
        </AppLayout>
    )
}