<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function addTestimonial(Request $request)
    {
        $validator = validator($request->all(), [
            "feedback" => "required|min:1|max:1000|string",
            "rating" => "required|min:1|max:100|string"
        ]);
    
    
        if($validator->fails()){
            return response()->json([
            "ok" => false,
            "message" => "Testimonial Creation failed.",
            "errors" => $validator->errors()
            ], 400);
        }
    //error 400, response status code, 200 (ok) 201 (created) 400 (bad request/client error)
    
        $testimonial = Testimonial::create($validator->validated());

    
        return response()->json([
            "ok" => true,
            "message" => "Testimonial has been created!",
            "data" => $testimonial
            ], 201);
    }
    
    
   
   /**
    * RETRIEVE all testimonials
    * GET: /api/testimonial
    * @return \Illuminate\Http\Response
    */
   
    public function showAllTestimonials(){
       return response()->json([
       "ok" => true,
       "message" => "All Testimonial has been retrieved",
       "data" => Testimonial::all()
       ]);
   }
   
   
   
   //Retrieve specific testimonial using ID
   /**
    * GET: /api/testimonial/{testimonial}
    * @param Testimonial
    * @return \Illuminate\Http\Response
    */
   
   
    public function showTestimonial(Testimonial $testimonial){
       return response()->json([
           "ok" =>true,
           "message" => "Testimonial has been retrieved.",
           "data" => $testimonial
       ]);
       }
   
   
   /**
       * PATCH: /api/testimonial/{Testimonial}
       * @param Request
       * @param Testimonial
       * @return \Illuminate\Http\Response
       */
   
       public function updateTestimonial(Request $request, Testimonial $testimonial){
               $validator = validator($request->all(), [
                "feedback" => "required|min:1|max:1000|string",
                "rating" => "required|min:1|max:100|string"
               ]);
           
               if($validator->fails()){
                   return response()->json([
                       "ok" => false,
                       "message" => "Testimonial Update failed.",
                       "errors" => $validator->errors()
                   ], 400);
               }
           
            //    $testimonial->update($request->only(['name', 'price']));
               $testimonial->update($validator->validated());
               return response()->json([
                   "ok" => true,
                   "message" => "Testimonial has been updated!",
                   "data" => $testimonial
               ], 200);
           
       }
   
   
   
   
   //DELETE specific user using ID
   /**
    * GET: /api/testimonial/{Testimonial}
    * @param Testimonial
    * @return \Illuminate\Http\Response
    */
   
   
    public function deleteTestimonial(Testimonial $testimonial){
       $testimonial->delete();
       return response()->json([
           "ok" =>true,
           "message" => "Testimonial has been deleted.",
           "data" => $testimonial
       ]);
       }
   
   
   
    
}
