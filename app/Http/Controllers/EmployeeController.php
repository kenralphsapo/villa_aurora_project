<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class EmployeeController extends Controller
{
    protected $employee;

    public function __construct()
    {
        $this->employee = new Employee();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response['employees'] = $this->employee->all();
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
        $this->employee->create($request->all());
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
        $response['employee'] = $this->employee->find($id);
        return view('pages.edit')->with($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee = $this->employee->find($id);
        $employee->update(array_merge($employee->toArray(), $request->toArray()));
        return redirect('employee');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = $this->employee->find($id);
        $employee->delete();
        return redirect('employee');
    }

  
 

}
