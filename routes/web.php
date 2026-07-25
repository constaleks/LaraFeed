<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostToggleLike;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home.index');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about.index');

Route::prefix('posts')->group(function() {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/create', [PostController::class, 'create']);
    Route::get('/{id}', [PostController::class, 'show']);
    Route::post('/', [PostController::class, 'store']);
    Route::post('/{post}/toggle/like', PostToggleLike::class);
});

Route::prefix('comments')->group(function() {
    Route::post('/', [CommentController::class, 'store']);
});