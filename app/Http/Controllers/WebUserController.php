<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class WebUserController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = new User();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response['users'] = $this->user->all();
        return view('pages.index')->with($response);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'username' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8',
    ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }

    $this->user->create($request->all());
    return redirect()->back()->with('success', 'Registration successful!');
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $response['user'] = $this->user->find($id);
        return view('pages.edit')->with($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $this->user->find($id);
        $user->update(array_merge($user->toArray(), $request->toArray()));
        return redirect('user');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->user->find($id);
        $user->delete();
        return redirect('user');
    }
    public function home()
   {
       return view('resvilla.home');
   }
  

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


}
 

