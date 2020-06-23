<?php

namespace App\Http\Controllers;

use App\LikesDislikes;
use App\User;

class UserController extends Controller
{
    public function show(int $id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            "user" => $user
        ]);
    }

    public function post(int $post_id)
    {
        $user_id = AuthController::getUserIdOfToken(request());

        $like = LikesDislikes::where('user_id', $user_id)
                             ->where("post_id", $post_id)
                             ->first();

        if (!$like || empty($like)) {
            return response()->json([
                "message" => "Not feedback or post not exist",
                "status" => 2
            ], 204);
        }

        return response()->json([
            "status" => $like->like
        ]);
    }
}
