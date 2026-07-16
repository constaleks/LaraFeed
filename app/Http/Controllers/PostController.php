<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\RedirectResponse; 
use App\Models\User;

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
            'post' => Post::with('user')->findOrFail($id),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|min:5|max:120',
            'body' => 'required|string|min:10|max:255'
        ]);

        Post::create([
            ...$validated,
            'user_id' => User::inRandomOrder()->first()->id
        ]);

        return redirect('/posts');
    }
}
