<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{

    /**
     * CRUD on Rooms Table
     * CREATE a room data from request
     * POST: /api/rooms
     * @param Request
     * @return \Illuminate\Http\Response
     */

    public function addRoom(Request $request)
    {
        $validator = validator($request->all(), [
            "name" => "required|min:1|max:50|string",
            "price" => "required|min:1|max:100000|numeric",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Room Creation failed.",
                "errors" => $validator->errors(),
            ], 400);
        }

        //error 400, response status code, 200 (ok) 201 (created) 400 (bad request/client error)

        $room = Room::create($validator->validated());
        //$room->room; show user profile when inserting

        return response()->json([
            "ok" => true,
            "message" => "Room has been created!",
            "data" => $room,
        ], 201);
    }

    /**
     * RETRIEVE all rooms
     * GET: /api/rooms
     * @return \Illuminate\Http\Response
     */

    public function showAllRooms()
    {
        return response()->json([
            "ok" => true,
            "message" => "All Rooms has been retrieved",
            "data" => Room::all(),
        ]);
    }


    /**
     * Retrieve specific service using ID
     * GET: /api/rooms/{room}
     * @param Room
     * @return \Illuminate\Http\Response
     */

    public function showRoom(Room $room)
    {
        return response()->json([
            "ok" => true,
            "message" => "this Room has been retrieved.",
            "data" => $room,
        ]);
    }

    /**
     * PATCH: /api/rooms/{room}
     * @param Request
     * @param Room
     * @return \Illuminate\Http\Response
     */

    public function updateRoom(Request $request, Room $room)
    {
        $validator = validator($request->all(), [

            "name" => "sometimes|min:1|max:50|string|max:50",
            "price" => "sometimes|min:1|max:100000|numeric",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Failed to update Room",
                "errors" => $validator->errors(),
            ], 400);
        }

        //$room->update($request->only(['name']));
        $room->update($validator->validated());
        return response()->json([
            "ok" => true,
            "message" => "Room has been updated!",
            "data" => $room,
        ]);
    }

    /**
     * DELETE specific room using ID
     * GET: /api/room/{room}
     * @param Room
     * @return \Illuminate\Http\Response
     */

    public function deleteRoom(Room $room)
    {
        $room->delete();
        return response()->json([
            "ok" => true,
            "message" => "Room has been deleted.",
            "data" => $room,
        ]);
    }

}
