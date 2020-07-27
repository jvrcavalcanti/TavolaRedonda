<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepositoryEloquent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller
{
    protected UserRepositoryEloquent $repository;

    public function __construct(UserRepositoryEloquent $repository)
    {
        $this->repository = $repository;
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            "name" => 'required|string|unique:users',
            "email" => 'required|email|unique:users',
            "password" => "required"
        ]);

        $input = $request->only(['name', 'email', 'password']);

        $user = $this->repository->create($input);

        $data = [
            "token" => $user->createToken(env("APP_KEY"))->accessToken,
            "user" => $user
        ];

        return response()->json([
            "data" => $data,
            "message" => "User registraition successful!"
        ], 200);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            "name" => "required|string",
            "password" => "required|string"
        ]);

        ['name' => $name, 'password' => $password] = $request->only(["name", "password"]);

        $user = $this->repository->login($name, $password);

        $data = [
            "token" => $user->createToken(env("APP_KEY"))->accessToken,
            "user" => $user
        ];

        return response()->json([
            "data" => $data,
            "message" => "Login successful"
        ]);
    }
}
