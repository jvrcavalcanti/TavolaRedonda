<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function createUser(User $user)
    {
        $user->password = Hash::make($user->password);
        $user->save();
    }

    public function login(string $username, string $password): User
    {
        $user = User::
                    where('username', $username)
                    ->firstOrFail();

        if (!Hash::check($password, $user->password)) {
            throw new \Exception("Invalid password");
        }

        return $user;
    }
}
