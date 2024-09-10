<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\UserRegistered;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Laravolt\Avatar\Avatar;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    /**
     * REGISTER a new user
     * POST: /api/register
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
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

        $validatedData = $validator->validated();
        $user = User::create($validatedData);

        $backgroundColors = Config::get('laravolt.avatar.backgrounds');
        $backgroundColor = $backgroundColors[array_rand($backgroundColors)];

        $avatar = new Avatar();
        $avatarImage = $avatar->create($user->username)
            ->setBackground($backgroundColor);

        $filename = strtolower(str_replace(' ', '-', $user->username)) . '.png';
        $path = storage_path('app/public/avatars/' . $filename);
        $directory = dirname($path);

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        try {
            $avatarImage->save($path);
        } catch (\Exception $e) {
            return $this->InternalError('Could not save avatar image: ' . $e->getMessage());
        }

        $user->avatar = 'avatars/' . $filename;
        $user->save();

        $user->token = $user->createToken("registration_token")->accessToken;
        Mail::to($user->email)->queue(new UserRegistered($user));

        return $this->Ok($user, "Register Successfully!");
    }

    /**
     * LOGIN a user
     * POST: /api/login
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = validator($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $credentials = $request->only('username', 'password');

        if (auth()->attempt(['email' => $credentials['username'], 'password' => $credentials['password']]) ||
            auth()->attempt(['username' => $credentials['username'], 'password' => $credentials['password']])
        ) {
            $user = auth()->user();
            $user->token = $user->createToken('api-token')->accessToken;

            return $this->Ok($user, "Login Success");
        }

        return $this->Unauthorized("Incorrect username or password");
    }

    /**
     * Retrieve the user info using bearer token
     * GET: /api/checkToken
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function checkToken(Request $request)
    {
        return $this->Ok($request->user(), "User info has been retrieved");
    }

    /**
     * Revoke the user's token
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function revokeToken(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return $this->Unauthorized('Unauthorized');
        }

        $user->token()->revoke();

        return $this->Ok(null, 'Token has been revoked!');
    }

    /**
     * Send password reset instructions
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function forgotPassword(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->NoDataFound();
        }

        $baseToken = $user->email . ':' . now()->timestamp . ':' . Str::random(10);
        $token = hash('sha256', $baseToken);
        $expiresAt = now()->addHour();

        $user->token = $token;
        $user->token_expires_at = $expiresAt;
        $user->save();

        Mail::to($user->email)->queue(new ResetPasswordMail($user, $token));

        return $this->Ok(null, 'Password reset instructions sent to your email');
    }

    /**
     * Reset the user's password
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function resetPassword(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            'password' => [
                'required',
                'min:8',
                'max:32',
                'string',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/',
            ],
        ], [
            'password.regex' => 'The password must contain at least one letter, one number, and one special character.',
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $user = User::where('email', $request->email)
                    ->where('token', $request->token)
                    ->first();

        if (!$user) {
            return $this->Specific('Invalid email or token has expired');
        }

        if ($user->token_expires_at <= now()) {
            return $this->Specific('Token has expired');
        }

        $user->update([
            'password' => $request->password,
            'token' => null,
            'token_expires_at' => null,
        ]);

        return $this->Ok(null, 'Password reset successfully');
    }
}
