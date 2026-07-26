<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\RedirectResponse; 
use App\Models\User;
use App\Http\Requests\Post\StoreRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('posts/index', [
            'posts' => PostResource::collection(Post::with('user')->withCount('likes')->latest()->get()),
        ]);
    }

    public function show(string $id): Response
    {
        $post = Post::with('user')->findOrFail($id);

        return Inertia::render('posts/show', [
            'post' => new PostResource($post),
            'comments' => Inertia::defer(
                fn() => CommentResource::collection($post->comments()->with('user')->latest()->get())
            ),
            'likes' => Inertia::defer(
                fn() => [
                    'count' => $post->likes()->count(),
                    'user_has_liked' => auth()->check() && $post->likes()->where('user_id', auth()->id())->exists(),
                ]
            )
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Post::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return redirect('/posts');
    }
}
