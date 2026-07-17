import { Post } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({posts}: PostsIndexProps) {
    return (
        <AppLayout title="Posts">
            {posts.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                    <p>No posts found</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {posts.map(post => (
                        <Link key={post.id} href={`/posts/${post.id}`} className="block">
                            <Card className="transition-colors hover:bg-accent">
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="h-11 w-11 shrink-0 rounded-full bg-muted" />
                                        <span className="font-bold">{post.user?.name}</span>
                                        <span className="text-muted-foreground">·</span>
                                        <span className="text-muted-foreground">
                                            {new Date(post.created_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold">{post.title}</h4>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    {post.body.substring(0, 160)}
                                    {post.body.length > 160 && "..."}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </AppLayout>
    )
}