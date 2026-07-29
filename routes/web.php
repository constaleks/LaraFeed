<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostToggleLike;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;

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
    Route::post('/', [PostController::class, 'store'])->middleware('auth');
    Route::post('/{post}/toggle/like', PostToggleLike::class)->middleware('auth');
});

Route::prefix('comments')->group(function() {
    Route::post('/', [CommentController::class, 'store'])->middleware('auth');
});

Route::prefix('auth')->middleware('guest')->group(function() {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::get('/register', [RegisterController::class, 'create']);
    Route::post('/login', [LoginController::class, 'store']);
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::delete('/logout', [LoginController::class, 'destroy'])->middleware('auth');