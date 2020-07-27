<?php

namespace App\Http\Controllers;

use App\Likes;
use App\Post;
use App\Repositories\PostRepositoryEloquent;
use App\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected PostRepositoryEloquent $repository;

    public function __construct(PostRepositoryEloquent $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $limit = $request->input("limit") ?? 10;
        $order = $request->input("order") ?? "asc";

        return $this->repository->list($limit, $order);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "title" => "required|string|unique:posts",
            "content" => "required|string",
            "tags" => "required"
        ]);

        $data = $request->only(['title', 'content', 'tags']);

        $data["tags"] = json_encode($data["tags"]);

        $data["user_id"] = auth()->user()->id;

        $post = $this->repository->create($data);

        if (!$post) {
            return response()->json([
                "message" => "Post create failed!"
            ], 409);
        }

        return response()->json([
            "message" => "Post create successful",
            "post" => $post
        ]);
    }

    public function show(int $id)
    {
        $post = $this->repository->find($id);

        return response()->json([
            "post" => $post
        ]);
    }

    public function search(Request $request)
    {
        $this->validate($request, [
            "q" => ["required", "string"],
            "type" => ["required", "string"]
        ]);

        $q = $request->input("q");
        $type = $request->input("type");

        if ($type == "tag") {
            return response()->json(
                $this->repository->searchByTag($q)->paginate(10)
            );
        }

        if ($type == "title") {
            return response()->json(
                $this->repository->searchByTitle($q)->paginate(10)
            );
        }
    }

    public function like($id)
    {
        $this->likeOrDislike(true, $id);
    }

    public function dislike($id)
    {
        $this->likeOrDislike(false, $id);
    }

    public function likeOrDislike(bool $liked, int $post_id)
    {
        $post = $this->repository->find($post_id);
        $user = auth()->user();

        $like = Likes::where([
            ["post_id", $post->id],
            ["user_id", $user->id]
        ])->first();

        if ($like && $like->like == $liked) {
            return response()->json([
                "success" => $like->delete(),
                "message" => "Like/Dislike Deleted"
            ]);
        }

        if (!$like) {
            $like = new Likes();

            $like->post_id = $post->id;
            $like->user_id = $user->id;
            $like->like = $liked;

            $like->save();
        }

        if ($like) {
            Likes::where([
                ["post_id", $post_id],
                ["user_id", $user->id]
            ])->update([
                "like" => $liked
            ]);
        }

        if ($liked) {
            $post->likes = Post::countLikes($post->id);
        }

        if (!$liked) {
            $post->dislikes = Post::countDislikes($post_id);
        }

        return response()->json([
            "post" => $post
        ]);
    }

    public function destroy(int $id)
    {
        $user = auth()->user();

        if (!$user->is_admins) {
            return response()->json([
                "message" => "Forbidden"
            ], 403);
        }

        $result = $this->repository->deleteById($id);

        return response()->json([
            "success" => $result
        ]);
    }

    public function comments(int $id)
    {
        $post = $this->repository->find($id);

        return response()->json([
            "comments" => $post->comments()->get()
        ]);
    }
}
