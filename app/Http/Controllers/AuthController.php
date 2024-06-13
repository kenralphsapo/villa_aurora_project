<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationConfirmation;
use App\Models\SentEmailLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{

    /**
     * register
     *
     * @param  mixed $request
     * @return void
     */
    public function register(Request $request){
    $validator = validator($request->all(), [
        "username" => "required|min:4|string|unique:users|max:32",
        "password" => "required|min:8|max:32|string|confirmed",
        "mobile" => "required|min:11|max:13|phone:PH",
        "email" => "required|email|max:64|unique:users",
        "role" => "sometimes|in:guest,scheduler,admin",
        'profile' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            "ok" => false,
            "message" => "Request didn't pass the validation.",
            "errors" => $validator->errors()
        ], 400);
    }

    if ($request->hasFile('profile')) {
        $image = $request->file('profile');
        $imageName = $image->getClientOriginalName(); // Use the original file name
        $image->move(public_path('images'), $imageName);
    } else {
        $imageName = 'default.png';
    }

    $validatedData = $validator->validated();
    $validatedData['profile'] = $imageName;

    $user = User::create($validatedData);

    /*
    if ($user->id == 1) {
        $user = User::find(1);
        $user->role = 'admin';
        $user->save();
    }
    */

    $user->token = $user->createToken("registration_token")->accessToken;

    // Set the profile image URL using the asset() helper function
    $user->image_url = asset('images/' . $imageName);

    $mailTest = Mail::to($user->email)->send(new RegistrationConfirmation($user));
    // Log::info($mailTest->getSymfonySentMessage());

    SentEmailLog::create([
        'user_id' => $user->id,
        'recipient_email' => $user->email,
        'sent_at' => now(),
        'subject' => 'Registration Confirmation Email',
    ]);

    
    return response()->json([
        "ok" => true,
        "message" => "Register Successfully!",
        "data" => $user
    ], 201);
    }
    

    /**
     * LOGIN
     * POST: /api/login
     * @param Request
     * @param \Illuminate\Http\Response
     */    
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

    $credentials = $request->only("username", "password");
    // Check if the user can be authenticated using either email or username
    if(auth()->attempt(["email" => $credentials["username"], "password" => $credentials["password"]]) ||
       auth()->attempt(["username" => $credentials["username"], "password" => $credentials["password"]])) {
        $user = auth()->user();
        $user->token = $user->createToken("api-token")->accessToken;
        return response()->json([
            "ok" => true,
            "message" => "Login Success",
            "data" => $user
        ], 200);
    }
    
    if(auth()->attempt($validator->validated())){
        $user=auth()->user();
        $user->token = $user->createToken("api-token")->accessToken;
        return response()->json([
            "ok" => true,
            "message" =>"Login Success",
            "data" => $user
        ], 200);
        
        }
        
        // Fail message
        return response()->json([
            "ok"=>false,
            "message"=>"Incorrect username or password, Please try again",
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