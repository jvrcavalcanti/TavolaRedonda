<?php

namespace App\Repositories;

use App\Comment;

class CommentRepositoryEloquent
{
    public function create(array $data): Comment
    {
        $coment = new Comment($data);
        $coment->save();
        return $coment;
    }

    public function deleteById($id)
    {
        return (bool) Comment::findOrFail($id)->delete();
    }
}
