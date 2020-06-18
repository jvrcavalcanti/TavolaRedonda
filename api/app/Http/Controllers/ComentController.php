<?php

namespace App\Http\Controllers;

use App\Coment;
use App\User;
use Illuminate\Http\Request;

class ComentController extends Controller
{
    public function create(Request $request)
    {
        $this->validate($request, [
            "content" => ["required", "string"],
            "post_id" => ["required", "integer"]
        ]);

        $inputs = $request->only(["content", "post_id"]);

        $inputs["user_id"] = AuthController::getUserIdOfToken($request);

        $coment = new Coment($inputs);

        return response()->json([
            "success" => $coment->save(),
            "coment" => $coment
        ]);
    }

    public function destroy(int $id)
    {
        $user = User::find(AuthController::getUserIdOfToken(request()));

        $coment = Coment::FindOrFail($id);

        if ($user->is_admins) {
            return response()->json([
                "success" => $coment->delete(),
                "message" => "Coment deleted"
            ]);
        }

        return response()->json([
            "message" => "Not permission"
        ], 403);
    }
}
