<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Repositories\LikeRepository;
use App\Repositories\PostRepository;
use App\Rules\TagsArray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    private PostRepository $repository;
    private LikeRepository $likeRepository;

    public function __construct(PostRepository $repository, LikeRepository $likeRepository)
    {
        $this->repository = $repository;
        $this->likeRepository = $likeRepository;
    }

    public function index(Request $request)
    {
        $paginator = \App\Models\Post::
                                orderBy('id', $request->input('order') ?? 'desc')
                                ->simplePaginate($request->input('limit') ?? 5);
        $paginator->getCollection()->map(fn($post) => $this->repository->decodeTags($post));
        return response()->json($paginator);
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
                'message' => "Forbidden"
            ], 403);
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
            'tags' => ['required', new TagsArray]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->all()
            ], 400);
        }

        $post = new Post($request->only(['title', 'text', 'tags']));

        $post->user_id = auth()->user()->id;

        try {
            $this->repository->create($post);

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

    public function like(Post $post, bool $value)
    {
        $user_id = auth()->user()->id;
        $post_id = $post->id;

        try {
            // Not exists, create a new register
            if (!$this->likeRepository->exists($user_id, $post_id)) {
                $this->likeRepository->create($value, $user_id, $post_id);

                return response()->json([
                    'message' => 'Post liked'
                ], 201);
            }

            $like = $this->likeRepository->findByIds($user_id, $post_id);

            // Change value ex: 1 => 0, 0 => 1
            if ($like->value != $value) {
                $this->likeRepository->changeValue($user_id, $post_id);

                return response()->json([
                    'message' => 'Change'
                ]);
            // Delete ex: 1 => 1, 0 => 0
            } else {
                $like->delete();

                return response()->json([
                    'message' => 'Deleted'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function likeStatus(Post $post)
    {
        $user_id = auth()->user()->id;
        $post_id = $post->id;

        try {
            $like = $this->likeRepository->findByIds($user_id, $post_id);

            return response()->json([
                'exists' =>  !is_null($like),
                'value' => $like ? $like->value : null
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
