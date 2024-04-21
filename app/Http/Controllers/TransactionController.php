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


    public function transaction(Request $request)
    {
    $validator = Validator::make($request->all(),[
        'user_id' => 'required|exists:users,id',
        'room_id' => 'required|exists:rooms,id',
        'rent_start' => 'required|date|date_format:Y-m-d',
        'rent_end' => 'required|date|date_format:Y-m-d|after_or_equal:rent_start',
        'service_id' => 'required|array|min:1',
        'service_id.*' => 'exists:services,id'
        
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

        $transaction->services()->sync($validated["service_id"]);

        $transaction->services;

        return response()->json([
            'success' => true,
            'message' => 'Transaction successful',
            'data' => $transaction,
        ], 201);

    }

    public function showAllTransactions(Request $request){
        return response()->json([
        "ok" => true,
        "message" => "Transaction info has been retrieved",
        "data" => Transaction::all()
        ], 200);
    }

    }