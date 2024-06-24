<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $resetLink; // Define the variable to be used in the view

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $resetLink)
    {
        $this->user = $user;
        $this->resetLink = $resetLink; // Assign the reset link to the property
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Reset Your Password')
                    ->view('emails.reset_password'); // Pass variables directly or use with()
    }
}
