<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Rules\Lowercase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    private UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'username' => ['required', 'alpha_dash', 'max:30', 'min:3', new Lowercase],
            'password' => 'required|alpha_num|max:30|min:8'
        ]);

        try {
            $user = $this->repository->login($data['username'], $data['password']);

            return response()->json([
                'message' => 'Login successful!',
                'user' => $user,
                'token' => $user->createToken('user.token')->plainTextToken
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'alpha_dash', 'unique:users', 'min:3', 'max:30', new Lowercase],
            'email' => 'required|email|unique:users',
            'password' => 'required|alpha_num|max:30|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors()->all()
            ], 400);
        }

        $user = new User($request->only(['username', 'email', 'password']));

        try {
            $this->repository->createUser($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $user->createToken('user.token')->plainTextToken
        ], 201);
    }
}
