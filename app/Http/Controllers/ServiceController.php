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
            "name" => "required|min:1|max:50|string",
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
     * RETRIEVE specific service using ID
     * GET: /api/services/{service}
     * @param Service $service
     * @return \Illuminate\Http\Response
     */
    public function showService(Service $service) {
        return $this->Ok($service, "Service has been retrieved.");
    }

    /**
     * UPDATE a service using request data
     * PATCH: /api/services/{service}
     * @param Request $request
     * @param Service $service
     * @return \Illuminate\Http\Response
     */
    public function updateService(Request $request, Service $service) {
        $validator = validator($request->all(), [
            "name" => "sometimes|min:1|max:50|unique:services|string",
            "price" => "sometimes|min:1|max:100000|numeric"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $service->update($validator->validated());

        return $this->Ok($service, "Service has been updated!");
    }

    /**
     * DELETE specific service using ID
     * DELETE: /api/services/{service}
     * @param Service $service
     * @return \Illuminate\Http\Response
     */
    public function deleteService(Service $service) {
        $service->delete();
        return $this->Ok($service, "Service has been deleted.");
    }
}
