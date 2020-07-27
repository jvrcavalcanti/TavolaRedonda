<?php

namespace App\Repositories;

use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserRepositoryEloquent
{
    public function find($id)
    {
        return User::findOrFail($id);
    }

    public function create(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        $user = new User($data);
        $user->password = $data['password'];
        $user->save();
        return $user;
    }

    public function login(string $name, $password): User
    {
        $user = User::where("name", $name)->firstOrFail();

        if (!Hash::check($password, $user->password)) {
            abort(409, "Password incorrect");
        }

        $user->last_logged_in = Carbon::now();

        $user->save();

        return $user;
    }
}
