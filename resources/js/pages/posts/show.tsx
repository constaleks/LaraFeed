import { Post, Comment } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import CommentForm from '@/components/comments/comment-form';
import CommentCard from '@/components/comments/comment-card';

import { Deferred } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';

interface PostsShowProps {
    post: Post;
    comments: Comment[];
}

export default function PostsShow({post, comments}: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);

    const handleCommentAdded = () => {
        toast("Comment has been added", {
            description: "Thank You for sharing Your thoughts about this post!"
        });

        setTimeout(() => {
            commentsSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }, 100);
    };

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

            <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />

            <div ref={commentsSectionRef}>
                <Deferred data="comments" fallback={
                    <div className="text-center mt-8">
                        <p>Loading comments...</p>
                    </div>
                }>
                    {comments && comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <CommentCard key={comment.id} comment={comment} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-8">
                            <p>No comments yet.</p>
                        </div>
                    )}
                </Deferred>
            </div>
        </AppLayout>
    )
}