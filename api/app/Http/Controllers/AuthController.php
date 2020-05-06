<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            "name" => 'required|string|unique:users',
            "email" => 'required|email|unique:users',
            "password" => "required"
        ]);
        
        try {

            $input = $request->all();
            $input["password"] = Hash::make($input["password"]);

            $user = new User;
            
            $user->name = $input["name"];
            $user->email = $input["email"];
            $user->password = $input["password"];

            $user->save();

            $data = [
                "token" => $user->createToken(env("APP_KEY"))->accessToken,
                "user" => $user
            ];

            unset($user->password);

            return response()->json([
                "data" => $data,
                "message" => "User registraition successful!"
            ], 200);

        } catch(\Exception $e) {
            return response()->json([
                'message' => "User registration failed!"
            ], 409);
        }
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            "name" => "required|string",
            "password" => "required"
        ]);

        try {

            $model = new User;

            $input = $request->all();

            $user = User::where("name", $input["name"])->first();

            if (!$user) {
                return response()->json([
                    "message" => "User with name '" . $input["name"] . "' not found"
                ], 204);
            }

            if (!Hash::check($input["password"], $user->password)) {
                return response()->json([
                    "message" => "Password incorrect"
                ], 409);
            }

            $user->last_logged_in = Carbon::now();

            $user->save();

            $data = [
                "token" => $user->createToken(env("APP_KEY"))->accessToken,
                "user" => $user
            ];

            unset($user->password);

            return response()->json([
                "data" => $data,
                "message" => "Login successful"
            ]);

        } catch(\Exception $e) {
            return response()->json([
                "message" => "User login faield!"
            ], 409);
        }
    }

    public static function getToken(Request $request)
    {
        return $request->bearerToken();
    }

    public static function getTokenId(Request $request)
    {
        return (new \Lcobucci\JWT\Parser())->parse(self::getToken($request))->getClaim("jti");
    }

    public static function getUserIdOfToken(Request $request)
    {
        return \Laravel\Passport\Token::find(self::getTokenId($request))->user_id;
    }
}