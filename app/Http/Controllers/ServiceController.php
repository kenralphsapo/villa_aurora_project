<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //CRUD on Services

/**
 * CREATE a user data from request
 * POST: /api/services
 * @param Request
 * @return \Illuminate\Http\Response
 */

 public function addService(Request $request)
 {
     $validator = validator($request->all(), [
         "name" => "required|min:1|max:50|string",
         "price" => "required|min:1|max:100000|numeric"
     ]);
 
 
     if($validator->fails()){
         return response()->json([
         "ok" => false,
         "message" => "Service Creation failed.",
         "errors" => $validator->errors()
         ], 400);
     }
 //error 400, response status code, 200 (ok) 201 (created) 400 (bad request/client error)
 
     $service = Service::create($validator->validated());
     //$user->user; show user profile when inserting
 
     return response()->json([
         "ok" => true,
         "message" => "Service has been created!",
         "data" => $service
         ], 201);
 }
 
 

/**
 * RETRIEVE all services
 * GET: /api/services
 * @return \Illuminate\Http\Response
 */

 public function showAllServices(){
    return response()->json([
    "ok" => true,
    "message" => "All Services has been retrieved",
    "data" => Service::all()
    ]);
}



//Retrieve specific service using ID
/**
 * GET: /api/services/{service}
 * @param Service
 * @return \Illuminate\Http\Response
 */


 public function showService(Service $service){
    return response()->json([
        "ok" =>true,
        "message" => "Service has been retrieved.",
        "data" => $service
    ]);
    }


/**
    * PATCH: /api/services/{service}
    * @param Request
    * @param Service
    * @return \Illuminate\Http\Response
    */

    public function updateService(Request $request, Service $service){
        $validator = validator($request->all(), [

            "name" => "sometimes|min:1|max:50|string,$service->id|max:50|alpha_dash",
            "price" => "sometimes|min:1|max:50|float,$service->id"            
        ]);

        if($validator->fails())
        {
            return response()->json([
                "ok" => false,
            "message" => "Request didnt pass the validation",
            "errors" => $validator->errors()
            ], 400);
        }

        $service->update($validator->validated());
        return response()->json([
                "ok" => true,
                "message" => "Service has been updated!",
                "data" => $service
        ]);
    }




//DELETE specific user using ID
/**
 * GET: /api/services/{service}
 * @param Service
 * @return \Illuminate\Http\Response
 */


 public function deleteService(Service $service){
    $service->delete();
    return response()->json([
        "ok" =>true,
        "message" => "Service has been deleted.",
        "data" => $service
    ]);
    }




}
