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
        'user_id' => 'required|exists:user,id',
        'room_id' => 'required|exists:room,room',
        'rent_start' => 'required|date|date_format:Y-m-d',
        'rent_end' => 'required|date|date_format:Y-m-d|after_or_equal:rent_start' 
        
    ]);

    if($validator->fails()){
        return response()->json([
        "ok" => false,
        "message" => "Transaction creation Failed",
        "errors" => $validator->errors()
        ], 400);
        }

        $validated = $validator->validated();
        $transaction_input = $validator->safe()->except(['services_id']);
        $transaction = Transaction::create($transaction_input);

        if (isset($validated['service_id'])){
            $addons = [];
            foreach($validated['service_id'] as $key => $service){
                $services[$service] = [
                    "id" => $validated['services_id'][$key] ?? 1,
                    "price" => $services::find($service)->price
                ];
            }
            $transaction->services()->sync($services);
        }

        $user = User::find($transaction_input['id']);
        $room = Room::find($transaction_input['room']);
        $transaction->user()->associate($user);
        $transaction->room()->associate($room);

        $transaction->save();

        return response()->json([
            'success' => true,
            'message' => 'Transaction successful',
            'data' => $transaction,
        ], 201);

    }
}