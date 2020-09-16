<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository
{
    public function create($data)
    {
        $data['tags'] = json_encode($data['tags']);
        $post = new Post($data);
        $post->save();
        return $post;
    }
}
