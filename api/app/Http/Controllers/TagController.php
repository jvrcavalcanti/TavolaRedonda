<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Repositories\TagRepository;
use Illuminate\Http\Request;

class TagController extends Controller
{
    private TagRepository $repository;

    public function __construct(TagRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        return response()->json([
            'tags' => $this->repository->all()
        ]);
    }

    public function show(Tag $tag)
    {
        return response()->json([
            'tag' => $tag
        ]);
    }
}
