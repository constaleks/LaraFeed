<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\RedirectResponse; 
use App\Models\User;
use App\Http\Requests\Post\StoreRequest;

class PostController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('posts/index', [
            'posts' => Post::with('user')->latest()->get(),
        ]);
    }

    public function show(string $id): Response
    {
        return Inertia::render('posts/show', [
            'post' => Post::with([
                'user',
                'comments' => fn($query) => $query->with('user')->latest()
            ])->findOrFail($id),
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
            'user_id' => User::inRandomOrder()->first()->id
        ]);

        return redirect('/posts');
    }
}
