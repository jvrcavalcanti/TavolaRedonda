<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

class PostRepository
{
    private TagRepository $repository;

    public function __construct(TagRepository $repository)
    {
        $this->repository = $repository;
    }

    public function create(Post $post)
    {
        $post->tags = json_encode($post->tags);
        $post->save();
        $this->decodeTags($post);
    }

    public function findById(int $id): Post
    {
        $post = Post::findOrFail($id);
        $this->decodeTags($post);
        return $post;
    }

    public function all(string $order = "desc"): Collection
    {
        $posts = Post::orderBy('id', $order)->get();
        return $posts->map(fn($post) => $this->decodeTags($post));
    }

    public function decodeTags(Post $post)
    {
        $tags = [];
        foreach (json_decode($post->tags) as $id) {
            $tags[] = $this->repository->findById($id)->name;
        }
        $post->tags = $tags;
        return $post;
    }

    public function encodeTags(Post $post)
    {
        $post->tags = json_encode($post->tags);
        return $post;
    }
}
