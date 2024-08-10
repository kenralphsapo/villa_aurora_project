<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * CREATE a user data from request
     * POST: /api/users
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = validator($request->all(), [
            "username" => "required|min:4|string|unique:users|max:32",
            "password" => "required|min:8|max:32|string|confirmed",
            "mobile" => "required|min:11|max:13|phone:PH",
            "email" => "required|email|max:64|unique:users",
            "role" => "sometimes|in:guest,scheduler,admin"
        ]);

        if ($request->user()->role !== "admin") {
            unset($validator->rules()['role']);
        }

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $user = User::create($validator->validated());

        return $this->Ok($user, "Account has been created!");
    }

    /**
     * RETRIEVE all users
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function retrieve(Request $request) {
        $users = User::all();
        if ($users->isEmpty()) {
            return $this->NoDataFound();
        }
        return $this->Ok($users, "Retrieved Users!");
    }

    /**
     * Update specific user using inputs from request and id from URI
     * PATCH: /api/users/{user}
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user) {
        $validator = validator($request->all(), [
            "username" => "sometimes|min:4|max:32|unique:users,username," . $user->id,
            "password" => "sometimes|min:8|max:32|string|confirmed",
            "mobile" => "sometimes|min:11|max:13|phone:PH",
            "email" => "sometimes|email|max:64|unique:users,email," . $user->id,
            "role" => "sometimes|in:guest,scheduler,admin"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $user->update($validator->validated());

        return $this->Ok($user, "User has been updated!");
    }

    /**
     * DELETE specific user using ID
     * DELETE: /api/users/{user}
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $user) {
        $user->delete();
        return $this->Ok($user, "User has been deleted.");
    }
}
