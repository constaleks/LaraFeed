import { Post } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Link } from "@inertiajs/react";

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({posts}: PostsIndexProps) {
    return (
        <AppLayout title="Posts">
            {posts.length === 0 ? (
                <div className="px-4 py-8 text-center text-slate-400">
                    <p>No posts found</p>
                </div>
            ) : (
                <div className="-mx-4 flex flex-col divide-y divide-slate-700/60">
                    {posts.map(post => (
                        <Link
                            key={post.id}
                            href={`/posts/${post.id}`}
                            className="flex gap-3 px-4 py-4 transition-colors hover:bg-slate-800/40 first:pt-0 last:pb-0"
                        >
                            <div className="h-11 w-11 shrink-0 rounded-full bg-slate-700" />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-bold text-slate-100">{post.user.name}</span>
                                    <span className="text-slate-500">·</span>
                                    <span className="text-slate-400">
                                        {new Date(post.created_at).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <h4 className="mt-0.5 text-lg font-bold text-slate-100">{post.title}</h4>
                                <p className="mt-1 text-sm text-slate-400">
                                    {post.body.substring(0, 160)}
                                    {post.body.length > 160 && "..."}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </AppLayout>
    )
}