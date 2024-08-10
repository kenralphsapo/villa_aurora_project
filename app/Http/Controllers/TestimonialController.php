<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * CREATE a testimonial from request
     * POST: /api/testimonials
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function addTestimonial(Request $request) {
        $validator = validator($request->all(), [
            "feedback" => "sometimes|min:4|string|max:500",
            "rating" => "required|min:0|max:5|int",
            'transaction_id' => 'required|exists:transactions,id'
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $testimonial = Testimonial::create($validator->validated());

        return $this->Ok($testimonial, "Testimonial has been created!");
    }

    /**
     * RETRIEVE all testimonials
     * GET: /api/testimonials
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function showAllTestimonials(Request $request) {
        return $this->Ok(Testimonial::all(), "Testimonials have been retrieved");
    }

    /**
     * RETRIEVE specific testimonial using ID
     * GET: /api/testimonials/{testimonial}
     * @param Request $request
     * @param Testimonial $testimonial
     * @return \Illuminate\Http\Response
     */
    public function showTestimonial(Request $request, Testimonial $testimonial) {
        return $this->Ok($testimonial, "Testimonial has been retrieved.");
    }

    /**
     * UPDATE a testimonial using request data
     * PATCH: /api/testimonials/{testimonial}
     * @param Request $request
     * @param Testimonial $testimonial
     * @return \Illuminate\Http\Response
     */
    public function updateTestimonial(Request $request, Testimonial $testimonial) {
        $validator = validator($request->all(), [
            "feedback" => "sometimes|min:4|string|max:500",
            "rating" => "sometimes|min:0|max:5|int",
            "transaction_id" => 'sometimes|exists:transactions,id'
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator);
        }

        $testimonial->update($validator->validated());

        return $this->Ok($testimonial, "Testimonial has been updated!");
    }

    /**
     * DELETE specific testimonial using ID
     * DELETE: /api/testimonials/{testimonial}
     * @param Request $request
     * @param Testimonial $testimonial
     * @return \Illuminate\Http\Response
     */
    public function deleteTestimonial(Request $request, Testimonial $testimonial) {
        $testimonial->delete();
        return $this->Ok($testimonial, "Testimonial has been deleted.");
    }
}
