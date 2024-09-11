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
            'role' => 'sometimes|in:guest,scheduler,admin',
            'avatar' => 'sometimes|image|mimes:png,jpg,jpeg|max:2048'
        ], [
            'username.regex' => 'The username must contain only letters and no special characters, numbers, or spaces.',
            'avatar.image' => 'The avatar must be an image.',
            'avatar.mimes' => 'The avatar must be a file of type: png, jpeg, jpg.',
            'avatar.max' => 'The avatar size may not be greater than 2 MB.',
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
    
            // Handle avatar upload if present
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $filename = strtolower(str_replace(' ', '-', $user->username)) . '-avatar.' . $avatar->getClientOriginalExtension();
                $path = storage_path('app/public/avatars/' . $filename);
    
                // Create directory if it doesn't exist
                $directory = dirname($path);
                if (!is_dir($directory)) {
                    mkdir($directory, 0755, true); 
                }
    
                try {
                    // Save the avatar image
                    $avatar->move($directory, $filename);
                    
                    // Update the avatar path in the user's record
                    $user->avatar = 'avatars/' . $filename;
                    $user->save();
                } catch (\Exception $e) {
                    return $this->InternalError('Could not save avatar image: ' . $e->getMessage());
                }
            }
    
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

    /**
     * RETRIEVE a single user by ID
     * GET: /api/users/{id}
     * 
     * @param Request $request
     * @param int $id The ID of the user to retrieve
     * @return \Illuminate\Http\Response
     */
    public function getUser(Request $request, $id) {
        $validator = validator(['id' => $id], [
            'id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        try {
            $user = User::find($id);
            return $this->Ok($user, "User retrieved successfully!");
        } catch (\Exception $e) {
            return $this->Specific($e->getMessage(), "User Retrieval Failed!");
        }
    }



    
}
