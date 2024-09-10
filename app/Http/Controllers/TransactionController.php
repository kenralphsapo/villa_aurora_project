<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Room;
use App\Models\User;
use App\Mail\TransactionMail;
use Illuminate\Support\Facades\Mail;

class TransactionController extends Controller
{
    public function addTransaction(Request $request){
        $data = $request->all();
        $validator = validator($request->all(), [
            'user_id' => 'required|exists:users,id',
            'room_id' => 'sometimes|exists:rooms,id',
            'rent_start' => 'required|date|date_format:Y-m-d',
            'rent_end' => 'required|date|date_format:Y-m-d|after_or_equal:rent_start',
            'service_id' => 'required|array|min:1',
            'service_id.*' => 'exists:services,id',
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $validated = $validator->validated();

        $existingBooking = Transaction::whereRaw("((rent_start <= ? AND rent_end >= ?) OR (rent_start <= ? AND rent_end >= ?)) OR (? <= rent_start AND ? >= rent_end)", [
            $request->rent_start, $request->rent_start,
            $request->rent_end, $request->rent_end,
            $request->rent_start, $request->rent_end
        ])->where('room_id', $request->room_id)
        ->first();

        if ($existingBooking) {
            return $this->Specific("The schedule you've selected is conflicted with another schedule");
        }

        $transaction_input = $validator->safe()->only(['user_id', 'room_id', 'rent_start', 'rent_end']);
        $room = Room::find($validated["room_id"]);
        $transaction_input["room_price"] = $room->price;
        $transaction = Transaction::create($transaction_input);

        $arrayServicePrice = [];
        foreach ($validated["service_id"] as $service_id) {
            $service = Service::find($service_id);
            if ($service) {
                $arrayServicePrice[$service_id] = ["price" => $service->price];
            }
        }
        $transaction->services()->sync($arrayServicePrice);
        $transaction->load('services');
        $user = User::find($validated['user_id']);
        Mail::to($user->email)->queue(new TransactionMail($user, $transaction, $room));

        return $this->Ok($transaction, 'Transaction successful');
    }

    /**
     * RETRIEVE all transactions
     * GET: /api/transactions/retrieveTransaction
     * @return \Illuminate\Http\Response
     */
    public function showAllTransactions() {
        $transactions = Transaction::with('services')->get();
        return $this->Ok($transactions, "All Transactions have been retrieved");
    }

    /**
     * PATCH: /api/transactions/updateTransaction
     * @param Request $request
     * @param Transaction $transaction
     * @return \Illuminate\Http\Response
     */
    public function updateTransaction(Request $request) {
        $data = $request->all();
        $validator = validator($data, [
            'id' => 'required|exists:transactions,id',
            'user_id' => 'sometimes|exists:users,id',
            'room_id' => 'sometimes|exists:rooms,id',
            'room_price' => 'sometimes|min:1|max:100000|numeric',
            'rent_start' => 'sometimes|date|date_format:Y-m-d',
            'rent_end' => 'sometimes|date|date_format:Y-m-d|after_or_equal:rent_start',
            'service_id' => 'sometimes|array|min:1',
            'service_id.*' => 'exists:services,id'
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $transaction = Transaction::find($data['id']);
        $validated = $validator->validated();
        $transaction_input = $validator->safe()->only(['user_id', 'room_id', 'rent_start', 'rent_end']);
        $room = Room::find($validated["room_id"]);
        
        $transaction_input["room_price"] = $room->price;

        $transaction->update($transaction_input);

        $arrayServicePrice = [];
        foreach ($validated["service_id"] as $service_id) {
            $arrayServicePrice[$service_id] = ["price" => Service::find($service_id)->price];
        }
        $transaction->services()->sync($arrayServicePrice);
        $transaction->services;

        return $this->Ok($transaction, 'Transaction updated successfully');
    }


    /**
     * DELETE a specific transaction using ID
     * DELETE: /api/transactions/deleteTransaction
     * @param Transaction $transaction
     * @return \Illuminate\Http\Response
     */
    
    public function deleteTransaction(Request $request){
        $data = $request->all();
        $validator = validator($data, [
            'id' => 'required',
        ]);

        if($validator->fails()){
            return $this->BadRequest($validator);
        }

        if(Transaction::where('id',$data['id'])->delete()){
            return $this->Ok("","Transaction is deleted!");
        }

        return $this->Specific("Transaction Deletion failed!");
    }
}
