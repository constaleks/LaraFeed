import { Post, Comment, PostLikesData, PageProps, Paginated } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';

import { Deferred, InfiniteScroll, router, usePage, usePoll } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import LikeButton from '@/components/like-button';

interface PostsShowProps {
    post: Post;
    comments?: Paginated<Comment>;
    comments_count?: number;
    likes?: PostLikesData;
}

export default function PostsShow({ post, comments, comments_count, likes }: PostsShowProps) {
    const { user } = usePage<PageProps>().props;

    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const commentsCountRef = useRef(comments_count ?? 0);
    const isUserCommentAuthor = useRef(false);

    usePoll(5000, {
        only: ["comments_count", "likes"],
    });

    useEffect(() => {
        const newCommentsCount = comments_count ?? 0;
        if (newCommentsCount > commentsCountRef.current && commentsCountRef.current > 0 && !isUserCommentAuthor.current) {
            toast("New comments available", {
                duration: 6000,
                action: {
                    label: "View comments",
                    onClick: handleViewNewComments
                }
            })
        }
        commentsCountRef.current = newCommentsCount;
        isUserCommentAuthor.current = false;
    }, [comments_count]);

    const scrollToCommentsSection = () => {
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    };

    const handleViewNewComments = () => {
        router.reload({
            only: ["comments", "comments_count"],
            reset: ["comments"],
            onSuccess: scrollToCommentsSection,
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
                <CardContent className="space-y-4">
                    <p>{post.body}</p>
                    <Deferred data="likes" fallback={<LikeButton postId={post.id} count={likes?.count ?? 0} liked={likes?.user_has_liked} isLoading={!likes} />}>
                        <LikeButton postId={post.id} count={likes?.count} liked={likes?.user_has_liked} />
                    </Deferred>
                </CardContent>
            </Card>

            { user ? (
                <CommentForm postId={post.id} onCommentSubmitting={handleCommentSubmitting} onCommentAdded={handleCommentAdded} />
            ) : ""}

            <div ref={commentsSectionRef}>
                <InfiniteScroll data="comments">
                    <CommentList comments={comments?.data} />
                </InfiniteScroll>
            </div>
        </AppLayout>
    )
}