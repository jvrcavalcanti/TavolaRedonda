<?php

namespace App\Repositories;

use App\Models\Tag;

class TagRepository
{
    public function all()
    {
        return Tag::all();
    }

    public function findById($id)
    {
        return Tag::find($id);
    }
}
