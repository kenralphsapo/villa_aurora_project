<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * CREATE a user data from request
     * POST: /api/users/insertUser
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = validator($request->all(), [
            "username" => "required|min:4|string|unique:users|max:32|regex:/^[a-zA-Z]+$/",
            'password' => [
            'required',
            'string',
            'min:8',
            'max:32',
            'confirmed',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/',
            ],
            "mobile" => "required|min:11|max:13|phone:PH",
            "email" => "required|email|max:64|unique:users",
            "role" => "sometimes|in:guest,scheduler,admin"
        ], [
            'username.regex' => 'The username must contain only letters and no special characters, numbers, or spaces.',
            'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        ]);

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
     * UPDATE a user data from request
     * PATCH/PUT: /api/users/updateUser
     * 
     * @param Request $request The request containing user data to be updated
     * @throws \Exception If the update operation fails
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request) {
        $data = $request->all();
    
        
        $validator = validator($data, [
            'id' => 'required|exists:users,id', 
            'username' => 'required|string|regex:/^[a-zA-Z]+$/', 
            'email' => 'required|email|unique:users,email,'.$data['id'], 
            'mobile' => 'required|min:11|max:13|phone:PH', 
            'role' => 'required|string',
        ], [
            'username.regex' => 'The username must contain only letters and no special characters, numbers, or spaces.',
        ]);
    
        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }
    
        try {
            $user = User::findOrFail($data['id']);  
            $user->update([
                'username' => $data['username'],
                'email' => $data['email'],
                'mobile' => $data['mobile'],
                'role' => $data['role'],
            ]);
    
            return $this->Ok($user, "User has been updated!");
        } catch (\Exception $e) {
            
            return $this->Specific($e->getMessage(), "User Update Failed!");
        }
    }
    
    

    /**
     * A description of the entire PHP function.
     *
     * @param Request $request The request containing user data to be updated
     * @throws \Exception If the update operation fails
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request){
        $data = $request->all();
        $validator = validator($data, [
            'id' => 'required',
        ]);

        if($validator->fails()){
            return $this->BadRequest($validator);
        }

        
        if(User::where('id',$data['id'])->delete()){
            return $this->Ok("","User is deleted!");
        }

        return $this->Specific("User Deletion failed!");
    }
}
