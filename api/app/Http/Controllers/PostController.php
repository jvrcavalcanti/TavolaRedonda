<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private Post $model;

    public function __construct()
    {
        $this->model = new Post();
    }

    public function index()
    {
        return Post::orderBy("id", "desc")->get();
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "title" => "required|string|unique:posts",
            "content" => "required|string",
            "tags" => "required"
        ]);
        
        $post = new Post();

        $data = $request->only(['title', 'content', 'tags']);

        $data["user_id"] = AuthController::getUserIdOfToken($request);

        $post->title = $data["title"];
        $post->content = $data["content"];
        $post->tags = json_encode($data["tags"]);
        $post->user_id = $data["user_id"];

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
        $post = Post::find($id);
        return response()->json($post, $post ? 200 : 204);
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
                $this->searchByTag($q)
            );
        }

        if ($type == "title") {
            return response()->json(
                $this->searchByTitle($q)
            );
        }
    }

    public function searchByTitle(string $title)
    {
        return $this->model->where("title", "like", "%{$title}%")->orderBy("id", "desc")->get();
    }

    public function searchByTag(string $tag)
    {
        return $this->model->where("tags", "like", "%#{$tag}%")->orderBy("id", "desc")->get();
    }

    public function like(int $post_id)
    {
        $post = $this->model->find($post_id);

        $post->like ++;

        return response()->json([
            "success" => $post->save(),
            "likes" => $post->like
        ]);
    }

    public function dislike(int $post_id)
    {
        $post = $this->model->find($post_id);

        $post->dislike ++;

        return response()->json([
            "success" => $post->save(),
            "dislikes" => $post->dislike
        ]);
    }

    public function complaint(int $post_id)
    {
        $post = $this->model->find($post_id);

        $post->complaints ++;

        return response()->json([
            "success" => $post->save(),
            "complaints" => $post->complaints
        ]);
    }
}