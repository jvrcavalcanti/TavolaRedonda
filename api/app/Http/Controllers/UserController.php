<?php

namespace App\Http\Controllers;

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
}
