<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Repositories\CommentRepositoryEloquent;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    protected CommentRepositoryEloquent $repository;

    public function __construct(CommentRepositoryEloquent $repository)
    {
        $this->repository = $repository;
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "content" => ["required", "string"],
            "post_id" => ["required", "integer"]
        ]);

        $inputs = $request->only(["content", "post_id"]);

        $inputs["user_id"] = auth()->user()->id;

        $coment = $this->repository->create($inputs);

        return response()->json([
            "success" => !!$coment,
            "coment" => $coment
        ]);
    }

    public function destroy(int $id)
    {
        $user = auth()->user();

        if ($user->is_admins) {
            return response()->json([
                "success" => $this->repository->deleteById($id),
                "message" => "Comment deleted"
            ]);
        }

        return response()->json([
            "message" => "Not permission"
        ], 403);
    }
}
