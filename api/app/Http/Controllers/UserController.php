<?php

namespace App\Http\Controllers;

use App\Likes;
use App\Repositories\UserRepositoryEloquent;
use App\User;

class UserController extends Controller
{
    protected UserRepositoryEloquent $repository;

    public function __construct(UserRepositoryEloquent $repository)
    {
        $this->repository = $repository;
    }

    public function show(int $id)
    {
        $user = $this->repository->find($id);

        return response()->json([
            "user" => $user
        ]);
    }

    public function post(int $post_id)
    {
        $user_id = auth()->user()->id;

        $like = Likes::where('user_id', $user_id)
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
