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
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\Post\UpdateRequest;

class PostController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('posts/index', [
            'posts' => Inertia::scroll(fn() =>
                PostResource::collection(
                    Post::with('user')->withCount('likes')
                        ->orderBy('created_at', 'desc')
                        ->orderBy('id', 'desc')
                        ->cursorPaginate(5)
                )
            ),
        ]);
    }

    public function show(string $id): Response
    {
        $post = Post::with('user')->findOrFail($id);

        return Inertia::render('posts/show', [
            'post' => new PostResource($post),
            'can' => [
                'update' => auth()->check() && auth()->user()->can('update', $post),
                'delete' => auth()->check() && auth()->user()->can('destroy', $post),
            ],
            'comments' => Inertia::scroll(fn() => 
                CommentResource::collection(
                    $post->comments()->with('user')
                        ->orderBy('created_at', 'desc')
                        ->orderBy('id', 'desc')
                        ->cursorPaginate(5)
                )
            ),
            'comments_count' => Inertia::defer(fn() => $post->comments()->count()),
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
        Gate::authorize('create', Post::class);

        return Inertia::render('posts/create');
    }

    public function edit(Post $post): Response
    {
        Gate::authorize('update', $post);

        return Inertia::render('posts/edit', ['post' => $post]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        Gate::authorize('create', Post::class);

        $validated = $request->validated();

        Post::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('posts.index')->with('success', 'Post created successfully!');
    }

    public function update(UpdateRequest $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $validated = $request->validated();

        $post->update($validated);

        return redirect()->route('posts.show', $post)->with('success', 'Post edited successfully!');
    }

    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('destroy', $post);

        $post->delete();

        return redirect()->route('posts.index');
    }
}
