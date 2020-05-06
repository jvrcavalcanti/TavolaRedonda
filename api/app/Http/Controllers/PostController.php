<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
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
}