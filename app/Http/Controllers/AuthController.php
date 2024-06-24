<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationConfirmation;
use App\Models\SentEmailLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Str;


class AuthController extends Controller
{

    /**
     * register
     *
     * @param  mixed $request
     * @return void
     * source for regex: https://stackoverflow.com/questions/31539727/laravel-password-validation-rule
     */
    public function register(Request $request)
    {
        $validator = validator($request->all(), [
            "username" => "required|min:4|string|unique:users|max:32",
            "password" => [
                "required",
                "min:8",
                "max:32",
                "string",
                "confirmed",
                "regex:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/",
            ],
            "mobile" => "required|min:11|max:13|phone:PH",
            "email" => "required|email|max:64|unique:users",
            "role" => "sometimes|in:guest,scheduler,admin",
        ], [
            "password.regex" => "The password must contain at least one letter, one number, and one special character."
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors(),
            ], 400);
        }

    
        $user = User::create($validator->validated());
        $user->token = $user->createToken("registration_token")->accessToken;
    
        // Send welcome email
        Mail::to($user->email)->send(new WelcomeMail($user));
    
        return response()->json([
            "ok" => true,
            "message" => "Register Successfully!",
            "data" => $user,
        ], 201);
    }
    
    

    /**
     * LOGIN
     * POST: /api/login
     * @param Request
     * @param \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = validator($request->all(), [
            'username' => "required ",
            'password' => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass validation",
                "errors" => $validator->errors(),
            ], 400);
        }

        $credentials = $request->only("username", "password");
        // Check if the user can be authenticated using either email or username
        if (auth()->attempt(["email" => $credentials["username"], "password" => $credentials["password"]]) ||
            auth()->attempt(["username" => $credentials["username"], "password" => $credentials["password"]])) {
            $user = auth()->user();
            $user->token = $user->createToken("api-token")->accessToken;
            return response()->json([
                "ok" => true,
                "message" => "Login Success",
                "data" => $user,
            ], 200);
        }

        if (auth()->attempt($validator->validated())) {
            $user = auth()->user();
            $user->token = $user->createToken("api-token")->accessToken;
            return response()->json([
                "ok" => true,
                "message" => "Login Success",
                "data" => $user,
            ], 200);

        }

        // Fail message
        return response()->json([
            "ok" => false,
            "message" => "Incorrect username or password, Please try again",
        ], 401);
    }
    /**
     * Retrieve the user info using bearer token
     * GET: /api/checkToken
     * @param Request
     * @return \Illuminate\Http\Response
     */

    public function checkToken(Request $request)
    {
        return response()->json([
            "ok" => true,
            "message" => "User info has been retrieved",
            "data" => $request->user(),
        ], 200);
    }

    public function forgotPassword(Request $request){
    $validator = validator($request->all(), [
        'email' => 'required|email|exists:users,email',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'ok' => false,
            'message' => 'Validation failed',
            'errors' => $validator->errors(),
        ], 400);
    }

    $user = User::where('email', $request->email)->first();

    // Generate a temporary token or code (e.g., UUID or unique code)
    $temporaryCode = Str::random(10); // Example: Generate a 10-character random string

    // Store the temporary code in the database or associate it with the user session

    // Send an email with the temporary code or link for resetting password
    Mail::to($user->email)->send(new ResetPasswordMail($user, $temporaryCode));

    return response()->json([
        'ok' => true,
        'message' => 'Password reset instructions sent to your email',
    ]);
    }

    public function resetPassword(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'required|email|exists:users,email',
            'temporary_code' => 'required',
            'new_password' => 'required|min:8|max:32|string|confirmed',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return response()->json([
                'ok' => false,
                'message' => 'User not found',
            ], 404);
        }

        $user->password = $request->input('new_password');
        $user->update();
    
    
        return response()->json([
            'ok' => true,
            'message' => 'Password reset successfully',
        ]);
    }
    

    




}
