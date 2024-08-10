<?php

namespace App\Http\Controllers;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller
{
    use AuthorizesRequests, ValidatesRequests;
    // RESPONSES
    // the number codes works now in react native
    protected function BadRequest($validator){
        return response()->json(['ok' => false, 'errors' => $validator->errors()], 400);
    }


    protected function Ok($data = null, $message = "OK", $others = []){
        return response()->json(['ok' => true, 'data' => $data, 'message' => $message, 'others' => $others], 200);
    }

    protected function NoDataFound(){
        return response()->json(['ok' => false, 'message' => 'No data found.'], 404);
    }

    protected function Specific($message ="Specific Error."){
        return response()->json(['ok'=>false, 'message' => $message]);
    }

    protected function Unauthorized($message = "Unauthorized!"){
        return response()->json(['ok' => false, 'message' => $message], 401);
    }
}