<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    private PostRepository $repository;

    public function __construct(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $posts = \App\Models\Post::
                                orderBy('id', $request->input('order') ?? 'desc')
                                ->simplePaginate($request->input('limit') ?? 5);
        return response()->json($posts);
    }

    public function show(Post $post)
    {
        return response()->json([
            'post' => $post
        ]);
    }

    public function delete(Post $post)
    {
        if (!auth()->user()->admin) {
            return response()->json([
                'message' => "Unauthenticated"
            ], 401);
        }

        try {
            $post->delete();

            return response()->json([
                'message' => 'Post deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }


    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255|min:1|unique:posts',
            'text' => 'required',
            'tags' => ['required', 'array']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->all()
            ], 400);
        }

        $data = $request->only(['title', 'text', 'tags']);

        $data['user_id'] = auth()->user()->id;

        try {
            $post = $this->repository->create($data);

            return response()->json([
                'message' => 'Post created',
                'post' => $post
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
