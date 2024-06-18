<?php

namespace App\Http\Controllers;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    //CRUD, Testimonials
  //see APP:DEBUG on .env




/**
 * CREATE a testimonial data from request
 * POST: /api/testimonials
 * @param Request
 * @return \Illuminate\Http\Response
 */

 public function addTestimonial(Request $request)
 {
     $validator = validator($request->all(), [
         "feedback" => "sometimes|min:4|string||max:500",
         "rating" => "required|min:0|max:5|int",
         'transaction_id' => 'required|exists:transactions,id'
     ]);

 //error 400, response status code, 200 (ok) 201 (created) 400 (bad request/client error)
 
     if($validator->fails()){
         return response()->json([
             "ok" => false,
             "message" => "Request didnt pass the validation.",
             "errors" => $validator->errors()
         ], 400);
     }
 
     $testimonial = Testimonial::create($validator->validated());
 
     return response()->json([
         "ok" => true,
         "message" => "Testimonial has been created!",
         "data" => $testimonial
     ], 201);
 }
 


/**
 * RETRIEVE all testimonials
 * @param Request
 * @return \Illuminate\Http\Response
 */

public function showAllTestimonials(Request $request){
    return response()->json([
    "ok" => true,
    "message" => "Testimonials have been retrieved",
    "data" => Testimonial::all()
    ], 200);
}


//Retrieve specific testimonial using ID
/**
 * GET: /api/testimonials/{testimonial}
 * @param Request
 * @param Testimonial
 * @return \Illuminate\Http\Response
 */


public function showTestimonial(Request $request, Testimonial $testimonial){
    return response()->json([
        "ok" =>true,
        "message" => "Testimonial has been retrieved.",
        "data" => $testimonial
    ], 200);
    }




    /**
     * Update specific testimonial using inputs from request and id from URI
    * PATCH: /api/users/{user}
    * @param Request
    * @param Testimonial
    * @return \Illuminate\Http\Response
    */

    public function updateTestimonial(Request $request, Testimonial $testimonial){
    $validator = validator($request->all(), [
        "feedback" => "sometimes|min:4|string|max:500,$testimonial->id|max:500",
        "rating" => "sometimes|min:0|max:5|int,$testimonial->id|max:5",
        "transaction_id" => 'sometimes|exists:transactions,id' 
    ]);

    if($validator->fails())
    {
        return response()->json([
            "ok" => false,
            "message" => "Request didn't pass the validation",
            "errors" => $validator->errors()
        ], 400);
    }

    $testimonial->updateTestimonial($validator->validated());

    return response()->json([
        "ok" => true,
        "message" => "Testimonial has been updated!",
        "data" => $testimonial
    ], 200);
}



    
//DELETE specific testimonial using ID
/**
 * GET: /api/testimonials/{testimonial}
 * @param Testimonial
 * @return \Illuminate\Http\Response
 */


public function deleteTestimonial(Request $request, Testimonial $testimonial){
    $testimonial->delete();
    return response()->json([
        "ok" =>true,
        "message" => "Testimonial has been deleted.",
        "data" => $testimonial
    ], 200);
    }
}
