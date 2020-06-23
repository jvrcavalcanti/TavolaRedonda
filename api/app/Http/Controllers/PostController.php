<?php

namespace App\Http\Controllers;

use App\LikesDislikes;
use App\Post;
use App\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private Post $model;

    public function __construct()
    {
        $this->model = new Post();
    }

    public function index(Request $request)
    {
        $limit = $request->input("limit") ?? 10;
        $order = $request->input("order") ?? "asc";

        return Post::orderBy("id", $order)->paginate($limit);
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

        $data["user_id"] = AuthController::getUserIdOfToken($request);

        $post = new Post($data);

        $result = $post->save();

        if (!$result) {
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
        $post = Post::findOrFail($id);

        $post->likes = Post::countLikes($post->id);
        $post->dislikes = Post::countDislikes($post->id);

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
                $this->searchByTag($q)->paginate(10)
            );
        }

        if ($type == "title") {
            return response()->json(
                $this->searchByTitle($q)->paginate(10)
            );
        }
    }

    public function searchByTitle(string $title)
    {
        return $this->model->where("title", "like", "%{$title}%")->orderBy("id", "desc");
    }

    public function searchByTag(string $tag)
    {
        return $this->model->where("tags", "like", "%#{$tag}%")->orderBy("id", "desc");
    }

    public function likeOrDislike(bool $liked, int $post_id)
    {
        $post = Post::findOrFail($post_id);
        $user = AuthController::getUserOfToken(request());

        $like = LikesDislikes::where([
            ["post_id", $post->id],
            ["user_id", $user->user_id]
        ])->first();

        if ($like && $like->like == $liked) {
            return response()->json([
                "success" => $like->delete(),
                "message" => "Like/Dislike Deleted"
            ]);
        }

        if (!$like) {
            $like = new LikesDislikes();

            $like->post_id = $post->id;
            $like->user_id = $user->user_id;
            $like->like = $liked;

            $like->save();
        }

        if ($like) {
            LikesDislikes::where([
                ["post_id", $post_id],
                ["user_id", $user->user_id]
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

    public function like(int $id)
    {
        return $this->likeOrDislike(true, $id);
    }

    public function dislike(int $id)
    {
        return $this->likeOrDislike(false, $id);
    }

    public function destroy(int $id)
    {
        $user = User::find(AuthController::getUserIdOfToken(request()));

        if (!$user->is_admins) {
            return response()->json([
                "message" => "Forbidden"
            ], 403);
        }

        $result = Post::where("id", $id)->delete();

        return response()->json([
            "success" => $result ? true : false
        ]);
    }

    public function comments(int $id)
    {
        $post = Post::findOrFail($id);

        return response()->json([
            "comments" => $post->comments()->get()
        ]);
    }
}
