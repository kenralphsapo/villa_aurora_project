<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pivot; // Assuming you have a Pivot model

class PivotController extends Controller
{
    public function getAllDataPivot()
    {
        $data = Pivot::all();

        return response()->json([
            "ok" => true,
            "message" => "All Service Transaction data has been retrieved",
            "data" => $data
        ]);
    }

}
