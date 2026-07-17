<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Comment\StoreRequest;
use Illuminate\Http\RedirectResponse; 
use App\Models\Comment;
use App\Models\User;

class CommentController extends Controller
{
    public function store(StoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Comment::create([
            ...$validated,
            'user_id' => User::inRandomOrder()->first()->id
        ]);

        return redirect()->back();
    }
}
