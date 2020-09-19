<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

class PostRepository
{
    public function create($data)
    {
        $data['tags'] = json_encode($data['tags']);
        $post = new Post($data);
        $post->save();
        return $this->decodeTags($post);
    }

    public function findById(int $id): Post
    {
        $post = Post::findOrFail($id);
        return $this->decodeTags($post);
    }

    public function all(string $order = "desc"): Collection
    {
        $posts = Post::orderBy('id', $order)->get();
        return $posts->map(fn($post) => $this->decodeTags($post));
    }

    public function decodeTags(Post $post)
    {
        $post->tags = json_decode($post->tags);
        return $post;
    }

    public function encodeTags(Post $post)
    {
        $post->tags = json_encode($post->tags);
        return $post;
    }
}
