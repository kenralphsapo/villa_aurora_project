<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\UserRegistered;
use Illuminate\Support\Facades\Mail;

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
            'username' => [
                'required',
                'min:4',
                'string',
                'unique:users',
                'max:32',
                'regex:/^[a-zA-Z]+$/', 
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'max:32',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/', 
            ],
            'mobile' => [
                'required',
                'min:11',
                'max:13',
                'phone:PH', 
            ],
            'email' => [
                'required',
                'email',
                'max:30',
                'unique:users',
            ],
        ], [
           'username.regex' => 'The username must contain only letters and no special characters, numbers, or spaces.',
            'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        ]);
        
        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }
    
        $user = User::create($validator->validated());
        $user->token = $user->createToken("registration_token")->accessToken;
        Mail::to($user->email)->queue(new UserRegistered($user));
        return $this->Ok($user, "Register Successfully!");
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

    public function revokeToken(Request $request){
        $user = $request->user();

        if (!$user) {
            return $this->Unauthorized('Unauthorized');
        }

        $user->token()->revoke();

        return $this->Ok("Success", 'Token has been revoked!');
    }



    /**
     * forgotPassword
     *
     * @param  mixed $request
     * @return void
     * https://stackoverflow.com/questions/23015874/laravel-str-random-or-custom-function
     * The Str::random method generates a random string of the specified length. This function uses PHP's random_bytes function:
     * https://laravel.com/docs/11.x/strings
     */
    public function forgotPassword(Request $request)
    {

        $validator = validator($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'message' => 'Email does not exist, please try again!',
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        $token = Str::random(100);

        $user->token = $token;
        $user->save();

        Mail::to($user->email)->send(new ResetPasswordMail($user, $token));

        return response()->json([
            'ok' => true,
            'message' => 'Password reset instructions sent to your email',
        ]);
    }


    /**
     * resetPassword
     *
     * @param  mixed $request
     * @return void
     */
    public function resetPassword(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            "password" => [
                "required",
                "min:8",
                "max:32",
                "string",
                "confirmed",
                "regex:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/"
            ]
        ], [
            "password.regex" => "The password must contain at least one letter, one number, and one special character."
        ]);


        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'message' => 'Token has been expired or used',
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::where('email', $request->email)->where('token', $request->token)->first();

        if (!$user) {
            return response()->json([
                'ok' => false,
                'message' => 'Invalid email or temporary code',
            ], 400);
        }

        $user->update([
            'password',
            'temporary_code' => null,
        ]);
        // remove the token


        return response()->json([
            'ok' => true,
            'message' => 'Password reset successfully',
        ]);
    }
    
}
