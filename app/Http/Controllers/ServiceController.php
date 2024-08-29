<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * CREATE a service from request
     * POST: /api/services
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function addService(Request $request) {
        $validator = validator($request->all(), [
            "name" => "required|min:1|max:50|string|unique:services",
            "price" => "required|min:1|max:100000|numeric"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $service = Service::create($validator->validated());

        return $this->Ok($service, "Service has been created!");
    }

    /**
     * RETRIEVE all services
     * GET: /api/services
     * @return \Illuminate\Http\Response
     */
    public function showAllServices() {
        return $this->Ok(Service::all(), "All Services have been retrieved");
    }

    /**
     * UPDATE a service using request data
     * PATCH: /api/services/updateService
     * @param Request $request
     * @param Service $service
     * @return \Illuminate\Http\Response
     */
    public function updateService(Request $request){
        $data = $request->all();
    
        $validator = validator($data, [
            'id' => 'required|exists:services,id',
            'name' => 'sometimes|min:1|max:50|unique:services,name,' . $data['id'] . '|string',
            "price" => "required|min:1|max:100000|numeric" 
        ]);
    
        if($validator->fails()){
            return $this->BadRequest($validator);
        }
    
        try {
            $service = Service::find($data['id']);
        
            if (!$service) {
                return $this->Specific("", "Service not found!");
            }
            $service->update([
                'name' => $data['name'],
                'price' => $data['price'],
            ]);
    
            return $this->Ok($data, "Service has been updated!");
        } catch (\Exception $e) {
            return $this->Specific($e->getMessage(), "Service Update Failed! ");
        }
    }
    
    /**
     * DELETE specific service using ID
     * DELETE: /api/services/{service}
     * @param Service $service
     * @return \Illuminate\Http\Response
     */

    public function deleteService(Request $request){
        $data = $request->all();
        $validator = validator($data, [
            'id' => 'required',
        ]);

        if($validator->fails()){
            return $this->BadRequest($validator);
        }

        if(Service::where('id',$data['id'])->delete()){
            return $this->Ok("","Service is deleted!");
        }

        return $this->Specific("Service Deletion failed!");
    }
}
