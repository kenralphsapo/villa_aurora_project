<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * CREATE a room from request
     * POST: /api/rooms
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function addRoom(Request $request) {
        $validator = validator($request->all(), [
            "name" => "required|min:1|max:50|string",
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
     * GET: /api/rooms
     * @return \Illuminate\Http\Response
     */
    public function showAllRooms() {
        return $this->Ok(Room::all(), "All Rooms have been retrieved");
    }

    /**
     * RETRIEVE specific room using ID
     * GET: /api/rooms/{room}
     * @param Room $room
     * @return \Illuminate\Http\Response
     */
    public function showRoom(Room $room) {
        return $this->Ok($room, "This Room has been retrieved.");
    }

    /**
     * UPDATE a room using request data
     * PATCH: /api/rooms/{room}
     * @param Request $request
     * @param Room $room
     * @return \Illuminate\Http\Response
     */
    public function updateRoom(Request $request, Room $room) {
        $validator = validator($request->all(), [
            "name" => "sometimes|min:1|max:50|unique:rooms|string",
            "price" => "sometimes|min:1|max:100000|numeric"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $room->update($validator->validated());

        return $this->Ok($room, "Room has been updated!");
    }

    /**
     * DELETE specific room using ID
     * DELETE: /api/rooms/{room}
     * @param Room $room
     * @return \Illuminate\Http\Response
     */
    public function deleteRoom(Room $room) {
        $room->delete();
        return $this->Ok($room, "Room has been deleted.");
    }
}
