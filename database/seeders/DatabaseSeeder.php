<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Comment;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();
        $posts = Post::factory(30)->recycle($users)->create();

        Comment::factory(50)->create([
            'user_id' => fn() => $users->random()->id,
            'post_id' => fn() => $posts->random()->id,
        ]);
    }
}
