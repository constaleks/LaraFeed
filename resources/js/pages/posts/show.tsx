import { Post, Comment } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';

import { Deferred, usePoll } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface PostsShowProps {
    post: Post;
    comments?: Comment[];
}

export default function PostsShow({post, comments}: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const commentsCountRef = useRef(comments?.length ?? 0);
    const isUserCommentAuthor = useRef(false);

    usePoll(5000, {
        only: ["comments"],
    });

    useEffect(() => {
        const newCommentsCount = comments?.length ?? 0;
        console.log(isUserCommentAuthor.current);
        if (newCommentsCount > commentsCountRef.current && commentsCountRef.current > 0 && !isUserCommentAuthor.current) {
            toast("New comments available", {
                duration: 6000,
                action: {
                    label: "View comments",
                    onClick: scrollToCommentsSection
                }
            })
        } 
        commentsCountRef.current = newCommentsCount;
        isUserCommentAuthor.current = false;
    }, [comments]);

    const scrollToCommentsSection = () => {
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    };

    const handleCommentSubmitting = () => {
        isUserCommentAuthor.current = true;
    };

    const handleCommentAdded = () => {
        toast("Comment has been added", {
            description: "Thank You for sharing Your thoughts about this post!"
        });

        setTimeout(scrollToCommentsSection, 100);
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

            <CommentForm postId={post.id} onCommentSubmitting={handleCommentSubmitting} onCommentAdded={handleCommentAdded} />

            <div ref={commentsSectionRef}>
                <Deferred data="comments" fallback={<CommentList />}>
                    <CommentList comments={comments} />
                </Deferred>
            </div>
        </AppLayout>
    )
}