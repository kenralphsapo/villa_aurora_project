<?php

namespace App\Http\Controllers;

use App\Models\ServiceTransaction;
use Illuminate\Http\Request;

class ServiceTransactionController extends Controller
{
    //CRUD on Service Transaction Pivot Table
/**
 * CREATE a user data from request
 * POST: /api/serviceTransactions
 * @param Request
 * @return \Illuminate\Http\Response
 */

 public function addServiceTransaction(Request $request)
 {
     $validator = validator($request->all(), [
         "service_id" => "required|min:1|max:999|numeric",
         "transaction_id" => "required|min:8|max:999|numeric",
         "price" => "required|min:1|max:1000000|float",
         
 
     ]);
 
 
     if($validator->fails()){
         return response()->json([
         "ok" => false,
         "message" => "Failed to add Service Transaction.",
         "errors" => $validator->errors()
         ], 400);
     }
 //error 400, response status code, 200 (ok) 201 (created) 400 (bad request/client error)
 
     $serviceTransaction = serviceTransaction::create($validator->validated());
 
     return response()->json([
         "ok" => true,
         "message" => "Service Transaction has been created!",
         "data" => $serviceTransaction
         ], 201);
 }
 
 
 /**
  * RETRIEVE all users
  * GET: /api/serviceTransactions
  * @return \Illuminate\Http\Response
  */
 
 public function showServiceTransactions(){
     return response()->json([
     "ok" => true,
     "message" => "Service Transactions have been retrieved",
     "data" => serviceTransaction::all()
     ]);
 }
 
 
 //Retrieve specific user using ID
 /**
  * GET: /api/serviceTransaction/{serviceTransaction}
  * @param ServiceTransaction
  * @return \Illuminate\Http\Response
  */
 
 
 public function show(ServiceTransaction $serviceTransaction){
     return response()->json([
         "ok" =>true,
         "message" => "Service Transactions has been retrieved.",
         "data" => $serviceTransaction
     ]);
     }
 
 
 
 
     /**
     * PATCH: /api/serviceTransaction/{serviceTransaction}
     * @param Request
     * @param ServiceTransaction
     * @return \Illuminate\Http\Response
     */
 
     public function update(Request $request, ServiceTransaction $serviceTransaction){
         $validator = validator($request->all(), [
             "service_id" => "required|min:1|max:999|numeric,$serviceTransaction->service_id|max:999|alpha_dash",
             "transaction_id" => "required|min:8|max:999|numeric,$serviceTransaction->transaction_id|max:999",
             "price" => "required|min:1|max:1000000|float,$serviceTransaction->price|max:1000000"
         ]);
 
         if($validator->fails())
         {
             return response()->json([
                 "ok" => false,
             "message" => "Service Transaction could not be updated",
             "errors" => $validator->errors()
             ], 400);
         }
 
         $serviceTransaction->update($validator->validated());
         return response()->json([
                 "ok" => true,
                 "message" => "Service Transaction has been updated!",
                 "data" => $serviceTransaction
         ]);
     }
 
 
     
 //DELETE specific user using ID
 /**
  * GET: /api/serviceTransactions/{serviceTransaction}
  * @param ServiceTransaction
  * @return \Illuminate\Http\Response
  */
 
 
 public function destroy(ServiceTransaction $serviceTransaction){
     $serviceTransaction->delete();
     return response()->json([
         "ok" =>true,
         "message" => "Service Transaction has been deleted.",
         "data" => $serviceTransaction
     ]);
     }
 
}
