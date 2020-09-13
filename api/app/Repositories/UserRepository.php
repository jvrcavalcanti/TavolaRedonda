<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function createUser(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        $user = new User($data);
        $user->save();
        return $user;
    }

    public function login(array $data): User
    {
        $user = User::
                    where('username', $data['username'])
                    ->firstOrFail();

        if (!Hash::check($data['password'], $user->password)) {
            throw new \Exception("Invalid password");
        }

        return $user;
    }
}
