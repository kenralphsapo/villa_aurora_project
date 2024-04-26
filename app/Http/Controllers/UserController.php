<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  //CRUD, User Registration
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
        "username" => "required|min:4|string|unique:users|max:32",
        "password" => "required|min:8|max:32|string|confirmed",
        "mobile" => "required|min:11|max:13|",
        "email" => "required|email|max:64|unique:users"

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
        "message" => "Account has been created!",
        "data" => $user
        ], 201);
}


/**
 * RETRIEVE all users
 * @param Request
 * @return \Illuminate\Http\Response
 */

public function index(Request $request){
    return response()->json([
    "ok" => true,
    "message" => "User info has been retrieved",
    "data" => User::all()
    ], 200);
}


//Retrieve specific user using ID
/**
 * GET: /api/users/{user}
 * @param Request
 * @param User
 * @return \Illuminate\Http\Response
 */


public function show(Request $request, User $user){
    return response()->json([
        "ok" =>true,
        "message" => "User has been retrieved.",
        "data" => $user
    ], 200);
    }




    /**
     * Update specific user using inputs from request and id from URI
    * PATCH: /api/users/{user}
    * @param Request
    * @param User
    * @return \Illuminate\Http\Response
    */

    public function update(Request $request, User $user){
        $validator = validator($request->all(), [
            "username" => "sometimes|min:4|string|unique:users|max:32",
            "password" => "sometimes|min:8|max:32|string|confirmed",
            "mobile" => "sometimes|min:11|max:13|",
            "email" => "sometimes|email|max:64|unique:users",
            
            //"role" => User::in(["Administrator", "Guest"])
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
           /*
            if($request()->user->role != "Administrator")
            {
                unset($validator['role']);
            }
            */
        return response()->json([
                "ok" => true,
                "message" => "User has been updated!",
                "data" => $user
        ], 200);
    }


    
//DELETE specific user using ID
/**
 * GET: /api/users/{user}
 * @param User
 * @return \Illuminate\Http\Response
 */


public function destroy(Request $request, User $user){
    $user->delete();
    return response()->json([
        "ok" =>true,
        "message" => "User has been deleted.",
        "data" => $user
    ], 200);
    }

}
