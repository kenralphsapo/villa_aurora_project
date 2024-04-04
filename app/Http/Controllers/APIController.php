<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class APIController extends Controller
{

   public function register()
   {
    return view("register");
   }

   public function registerPost(Request $request)
   {
    // $employee = new Employee();
    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);

    $user->save();
    return back()->with("success","Registered successfully");
   }


     /**
     * Show the login form.
     */
   public function login()
   {
       return view('pages.login');
   }

   public function loginPost(Request $request)
   {
       $credentials = [
        'email' => $request->email,
        'password' => $request->password,
       ];
   
       if (Auth::attempt($credentials)) {
           // Authentication passed
           return redirect('/home')->with('success','Login successful');
       } 
       return back()->with('error','Email or Password wrong');
   }

   public function home()
   {
       return view('resvilla.home');
   }
}
