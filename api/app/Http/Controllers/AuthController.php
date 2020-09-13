<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Rules\LowerCase;
use Illuminate\Http\Request;

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
            'username' => 'required|max:30',
            'password' => 'required|max:30'
        ]);

        try {
            $user = $this->repository->login($data);

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
        $data = $request->validate([
            'username' => ['required', 'unique:users', 'max:30'],
            'password' => 'required|max:30'
        ]);

        if ($data['username'] !== strtolower($data['username'])) {
            return response()->json([
                'message' => 'Username must be lowercase'
            ], 400);
        }

        $user = $this->repository->createUser($data);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $user->createToken('user.token')->plainTextToken
        ], 201);
    }
}
