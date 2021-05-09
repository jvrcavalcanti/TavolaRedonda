<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthController extends Controller
{
    private UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        try {
            $user = $this->repository->login($data['username'], $data['password']);

            return response()->json([
                'message' => 'Login successful!',
                'user' => $user,
                'token' => $user->createToken('user.token')->plainTextToken
            ]);
        } catch (HttpException|NotFoundHttpException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function register(RegisterRequest $request)
    {
        $user = new User($request->validated());

        try {
            $this->repository->createUser($user);
        } catch (HttpException|NotFoundHttpException $e) {
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
