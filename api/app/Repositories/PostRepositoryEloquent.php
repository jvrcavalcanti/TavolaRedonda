<?php

namespace App\Repositories;

use App\Post;

class PostRepositoryEloquent
{
    public function find($id): Post
    {
        $post = Post::findOrFail($id);

        $post->likes = Post::countLikes($post->id);
        $post->dislikes = Post::countDislikes($post->id);

        return $post;
    }

    public function list(int $limit = 10, $order = 'asc')
    {
        return Post::orderBy("id", $order)->paginate($limit);
    }

    public function create(array $data): Post
    {
        $post = new Post($data);
        $post->save();
        return $post;
    }

    public function searchByTitle(string $title)
    {
        return Post::where("title", "like", "%{$title}%")->orderBy("id", "desc");
    }

    public function searchByTag(string $tag)
    {
        return Post::where("tags", "like", "%#{$tag}%")->orderBy("id", "desc");
    }

    public function deleteById($id)
    {
        return (bool) Post::findOrFail($id)->delete();
    }
}
