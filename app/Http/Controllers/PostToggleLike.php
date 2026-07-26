<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class PostToggleLike extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Post $post): RedirectResponse
    {
        $userId = auth()->id();

        $like = $post->likes()->where('user_id', $userId)->first();

        if ($like) {
            $like->delete();
        } else {
            $post->likes()->create(['user_id' => $userId]);
        }

        return redirect()->back();
    }
}