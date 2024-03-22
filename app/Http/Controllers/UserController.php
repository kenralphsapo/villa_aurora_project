<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //CRUD
  //see APP:DEBUG on .env




/**
 * CREATE a user data from request
 * POST: /api/users
 * @param Request
 * @return \Illuminate\Http\Response
 */

public function store(Request $request)
{
    $validator = validator($request->all(), [
        "name" => "required|min:4|string|unique:users|max:16",
        "email" => "required|email|max:64|unique:users",
        "password" => "required|min:8|max:32|string|confirmed"
    ]);


    if($validator->fails()){
        return response()->json([
        "ok" => false,
        "message" => "Request didnt pass the validation.",
        "errors" => $validator->errors()
        ], 400);
    }
//error 400, response status code, 200 (ok) 201 (created) 400 (bad request/client error)

    $user = User::create($validator->validated());
    return response()->json([
        "ok" => true,
        "message" => "User has been created!",
        "data" => $user
        ], 201);
}


/**
 * RETRIEVE all users
 * GET: /api/users
 * @return \Illuminate\Http\Response
 */

public function index(){
    return response()->json([
    "ok" => true,
    "message" => "users has been retrieved",
    "data" => User::all()
    ]);
}


//Retrieve specific user using ID
/**
 * GET: /api/users/{user}
 * @param User
 * @return \Illuminate\Http\Response
 */


public function show(User $user){
    return response()->json([
        "ok" =>true,
        "message" => "User has been retrieved.",
        "data" => $user
    ]);
    }




    /**
    * PATCH: /api/users/{user}
    * @param Request
    * @param User
    * @return \Illuminate\Http\Response
    */

    public function update(Request $request, User $user){
        $validator = validator($request->all(), [
            "name" => "sometimes|min:4|string|unique:users,name,$user->id|max:16|alpha_dash",
            "email" => "sometimes|email|max:64|unique:users,email,$user->id",
            "password" => "sometimes|min:8|max:32|string|confirmed"
        ]);

        if($validator->fails())
        {
            return response()->json([
                "ok" => false,
            "message" => "Request didnt pass the validation",
            "errors" => $validator->errors()
            ], 400);
        }

        $user->update($validator->validated());
        return response()->json([
                "ok" => true,
                "message" => "User has been updated!",
                "data" => $user
        ]);
    }


    
//DELETE specific user using ID
/**
 * GET: /api/users/{user}
 * @param User
 * @return \Illuminate\Http\Response
 */


public function destroy(User $user){
    $user->delete();
    return response()->json([
        "ok" =>true,
        "message" => "User has been deleted.",
        "data" => $user
    ]);
    }








}
