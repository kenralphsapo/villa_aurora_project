<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * REGISTER a new user
     * POST: /api/register
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {
        $validator = validator($request->all(), [
            "username" => "required|min:4|string|unique:users|max:32",
            "password" => "required|min:8|max:32|string|confirmed",
            "mobile" => "required|min:11|max:13|phone:PH",
            "email" => "required|email|max:64|unique:users",
            "role" => "sometimes|in:guest,scheduler,admin",
        
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $user = User::create($validator->validated());
        $user->token = $user->createToken("registration_token")->accessToken;

        return $this->Ok($user, "Register Succesfully!");
    }

    /**
     * LOGIN a user
     * POST: /api/login
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) {
        $validator = validator($request->all(), [
            'username' => "required",
            'password' => "required"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $credentials = $request->only("username", "password");

        if (auth()->attempt(["email" => $credentials["username"], "password" => $credentials["password"]]) ||
            auth()->attempt(["username" => $credentials["username"], "password" => $credentials["password"]])) {
            $user = auth()->user();
            $user->token = $user->createToken("api-token")->accessToken;

            return $this->Ok($user, "Login Success");
        }

        return $this->Unauthorized("Incorrect username or password");
    }

    /**
     * Retrieve the user info using bearer token
     * GET: /api/checkToken
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function checkToken(Request $request) {
        return $this->Ok($request->user(), "User info has been retrieved");
    }
}
