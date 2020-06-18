<?php

namespace App\Http\Controllers;

use App\Coment;
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
}
