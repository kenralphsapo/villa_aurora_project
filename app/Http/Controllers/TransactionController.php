<?php

namespace App\Http\Controllers;
use App\Models\Transaction;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use app\Models\Service;
use app\Models\ServiceTransaction;
use app\Models\Room;
use app\Models\User;

class TransactionController extends Controller
{


    public function addTransaction(Request $request)
    {
    $validator = Validator::make($request->all(),[
        'user_id' => 'required|exists:users,id',
        'room_id' => 'required|exists:rooms,id',
        'rent_start' => 'required|date|date_format:Y-m-d',
        'rent_end' => 'required|date|date_format:Y-m-d|after_or_equal:rent_start',
        'service_id' => 'required|array|min:1',
        'service_id.*' => 'exists:services,id',
    ]);

    if($validator->fails()){
        return response()->json([
        "ok" => false,
        "message" => "Transaction creation Failed",
        "errors" => $validator->errors()
        ], 400);
        }

        $validated = $validator->validated();
        $transaction_input = $validator->safe()->only(['user_id', 'room_id', 'rent_start', 'rent_end']);
        $transaction = Transaction::create($transaction_input);
        
        //must sync price
        //$transaction->services()->sync($validated["price"]);

        
        $transaction->services()->sync($validated["service_id"]);
        $transaction->services;

        return response()->json([
            'success' => true,
            'message' => 'Transaction successful',
            'data' => $transaction,
        ], 201);

    }

//TO-DO: MUST INCLUDE PRICE FROM SERVICES
    /**
    * RETRIEVE all transactions
    * GET: /api/transactions
    * @return \Illuminate\Http\Response
    */

 public function showAllTransactions(){
    $transactions = Transaction::with('services')->get();

    return response()->json([
    "ok" => true,
    "message" => "All Transactions has been retrieved",
    "data" => $transactions
    ]);
}
  




//Retrieve specific Transaction using ID
/**
 * GET: /api/transactions/{transaction}
 * @param Transaction
 * @return \Illuminate\Http\Response
 */


 public function showTransaction(Transaction $transaction){
    return response()->json([
        "ok" =>true,
        "message" => "Transaction has been retrieved.",
        "data" => $transaction
    ]);
    }


    /**
    * PATCH: /api/transactions/{transaction}
    * @param Request
    * @param Transaction
    * @return \Illuminate\Http\Response
    */

    public function updateTransaction(Request $request, Transaction $transaction){
        $validator = validator($request->all(), [

            'room_id' => 'sometimes|exists:rooms,id',
            'rent_start' => 'sometimes|date|date_format:Y-m-d',
            'rent_end' => 'sometimes|date|date_format:Y-m-d|after_or_equal:rent_start',
            'service_id' => 'sometimes|array|min:1',
            'service_id.*' => 'exists:services,id'
 
        ]);

    if ($validator->fails()) {
        return response()->json([
            "ok" => false,
            "message" => "Transaction update failed",
            "errors" => $validator->errors()
        ], 400);
    }

    $validated = $validator->validated();
    $transaction_input = $validator->safe()->only(['user_id', 'room_id', 'rent_start', 'rent_end']);
    $transaction->update($transaction_input);

    $transaction->services()->sync($validated["service_id"]);

    $transaction->services;

    return response()->json([
        'success' => true,
        'message' => 'Transaction updated successfully',
        'data' => $transaction,
    ], 200);
}



//DELETE Transaction user using ID
/**
 * GET: /api/transactions/{transaction}
 * @param Transaction
 * @return \Illuminate\Http\Response
 */


 public function deleteTransaction(Transaction $transaction){
    $transaction->delete();
    return response()->json([
        "ok" =>true,
        "message" => "Transaction has been deleted.",
        "data" => $transaction
    ]);
    }
}