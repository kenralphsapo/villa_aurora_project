<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Login
     * POST: /api/login
     * @param Request
     * @param \Illuminate\Http\Response
     */
    public function register(Request $request){
        $validator = validator($request->all(), [
            "username" => "required|min:4|string|unique:users|max:32",
            "password" => "required|min:8|max:32|string|confirmed",
            "mobile" => "required|min:11|max:13|phone:PH",
            "email" => "required|email|max:64|unique:users",
            "role" => "sometimes|in:guest,scheduler,admin"
        ]);
    
        if($validator->fails()){
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }
    
        $user = User::create($validator->validated());
    
        if ($user->id == 1) {
            $user = User::find(1);
            $user->role = 'admin';
            $user->save();
        }
    
        $user->token = $user->createToken("registration_token")->accessToken;
    
        return response()->json([
            "ok" => true,
            "message" => "Register Successfully!",
            "data" => $user
        ], 201);
    }
    

    public function login(Request $request){
        $validator = validator($request->all(), [
            'username'=>"required ",
            'password'=>"required"
        ]);

        if($validator->fails()){
            return response()->json([
            "ok" => false,
            "message"=>"Request didn't pass validation",
            "errors"=>$validator->errors()
        ], 400);
    }

    $credentials = $request->only('username', 'password');
    // Check if the user can be authenticated using either email or username
    if(auth()->attempt(['email' => $credentials['username'], 'password' => $credentials['password']]) ||
       auth()->attempt(['username' => $credentials['username'], 'password' => $credentials['password']])) {
        $user = auth()->user();
        $user->token = $user->createToken("api-token")->accessToken;
        return response()->json([
            "ok" => true,
            "message" => "Login Success",
            "data" => $user
        ], 200);
    }
    
    // if(auth()->attempt($validator->validated())){
    //     $user=auth()->user();
    //     $user->token = $user->createToken("api-token")->accessToken;
    //     return response()->json([
    //         "ok" => true,
    //         "message" =>"Login Success",
    //         "data" => $user
    //     ], 200);
        
    //     }
        
        // Fail message
        return response()->json([
            "ok"=>false,
            "message"=>"Incorrect username or password",
        ], 401);
}
    /**
     * Retrieve the user info using bearer token
     * GET: /api/checkToken
     * @param Request
     * @return \Illuminate\Http\Response
     */
    
     public function checkToken(Request $request){
        return response()->json([
            "ok" => true,
            "message"=>"User info has been retrieved",
            "data"=> $request->user()
        ], 200);
    }

}