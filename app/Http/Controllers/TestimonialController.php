<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * CREATE a testimonial from request
     * POST: /api/testimonials/insertTestimonial
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function addTestimonial(Request $request) {

        $validator = validator($request->all(), [
            'feedback' => 'sometimes|min:4|string|max:500',
            'rating' => 'required|integer|min:0|max:5',
            'transaction_id' => 'required|exists:transactions,id',
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $validatedData = $validator->validated();

        $existingTestimonial = Testimonial::where('transaction_id', $validatedData['transaction_id'])->first();
        if ($existingTestimonial) {
            return $this->Specific('A testimonial has already been added for this transaction.');
        }

        $testimonial = Testimonial::create($validatedData);

        return $this->Ok($testimonial, 'Testimonial has been created!');
    }

    

    /**
     * RETRIEVE all testimonials
     * GET: /api/testimonials/retrieveTestimonial
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function showAllTestimonials(Request $request) {
        return $this->Ok(Testimonial::all(), "Testimonials have been retrieved");
    }

    /**
     * UPDATE a testimonial using request data
     * PATCH: /api/testimonials/updateTestimonial
     * @param Request $request
     * @param Testimonial $testimonial
     * @return \Illuminate\Http\Response
     */
    public function updateTestimonial(Request $request) {
        $data = $request->all();
        $validator = validator($data, [
            "feedback" => "sometimes|min:4|string|max:500",
            "rating" => "sometimes|min:0|max:5|int",
            "transaction_id" => 'sometimes|exists:transactions,id'
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }
        $testimonial = Testimonial::find($data['id']);
        $testimonial->update($validator->validated());

        return $this->Ok($testimonial, "Testimonial has been updated!");
    }

    /**
     * DELETE specific testimonial using ID
     * DELETE: /api/testimonials/deleteTestimonial
     * @param Request $request
     * @param Testimonial $testimonial
     * @return \Illuminate\Http\Response
     */
    public function deleteTestimonial(Request $request) {
        $data = $request->all();
        $validator = validator($data, [
            'id' => 'required|exists:testimonials,id'
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        if (Testimonial::where('id', $data['id'])->delete()) {
            return $this->Ok("","Testimonial is deleted!");
        }

        return $this->Specific("Testimonial Deletion failed!");
    }

   
}
