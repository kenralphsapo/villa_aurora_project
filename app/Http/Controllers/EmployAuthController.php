<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmployeeAuthController extends Controller
{
    public function login(Request $employeeRequest)
    {
        $employeeValidator = validator($employeeRequest->all(), [
            'user_name' => "required",
            'password' => "required"
        ]);

        if ($employeeValidator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass validation",
                "errors" => $employeeValidator->errors()
            ], 400);
        }

        if (auth()->attempt($employeeValidator->validated())) {
            $employee = auth()->user();
            $employee->token = $employee->createToken("api-token")->accessToken;
            return response()->json([
                "ok" => false,
                "message" => "Login Success",
                "data" => $employee
            ], 200);
        }

        return response()->json([
            "ok" => false,
            "message" => "Invalid Employee Credentials!"
        ], 401);
    }
}
