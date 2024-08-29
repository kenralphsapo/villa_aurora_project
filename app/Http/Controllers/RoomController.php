<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * CREATE a room from request
     * POST: /api/rooms/insertRoom
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function addRoom(Request $request) {
        $validator = validator($request->all(), [
            "name" => "required|min:1|max:50|string|unique:rooms",
            "price" => "required|min:1|max:100000|numeric"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $room = Room::create($validator->validated());

        return $this->Ok($room, "Room has been created!");
    }

    /**
     * RETRIEVE all rooms
     * GET: /api/rooms/retrieveRoom
     * @return \Illuminate\Http\Response
     */
    public function showAllRooms() {
        return $this->Ok(Room::all(), "All Rooms have been retrieved");
    }

    /**
     * UPDATE a room using request data
     * PATCH: /api/rooms/updateRoom
     * @param Request $request
     * @param Room $room
     * @return \Illuminate\Http\Response
     */

    public function updateRoom(Request $request){
        $data = $request->all();
    
        $validator = validator($data, [
            'id' => 'required|exists:rooms,id',
            'name' => 'sometimes|min:1|max:50|unique:rooms,name,' . $data['id'] . '|string',
            'price' => 'required|numeric', 
        ]);
    
        if($validator->fails()){
            return $this->BadRequest($validator);
        }
    
        try {
            $room = Room::find($data['id']);
        
            if (!$room) {
                return $this->Specific("", "Service not found!");
            }
            $room->update([
                'name' => $data['name'],
                'price' => $data['price'],
            ]);
    
            return $this->Ok($data, "Room has been updated!");
        } catch (\Exception $e) {
            return $this->Specific($e->getMessage(), "Room Update Failed!" );
        }
    }

    /**
     * DELETE specific room using ID
     * DELETE: /api/rooms/deleteRoom
     * @param Room $room
     * @return \Illuminate\Http\Response
     */

    public function deleteRoom(Request $request){
        $data = $request->all();
        $validator = validator($data, [
            'id' => 'required',
        ]);

        if($validator->fails()){
            return $this->BadRequest($validator);
        }

        if(Room::where('id',$data['id'])->delete()){
            return $this->Ok("","Room is deleted!");
        }

        return $this->Specific("Room Deletion failed!");
    }
}
