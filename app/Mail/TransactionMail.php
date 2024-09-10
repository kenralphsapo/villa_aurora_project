<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TransactionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $transaction;
    public $room;

    /**
     * Create a new message instance.
     *
     * @param $user
     * @param $transaction
     */
    public function __construct($user, $transaction, $room)
    {
        $this->user = $user;
        $this->transaction = $transaction;
        $this->room = $room;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.transaction')
                    ->subject('Thank you for booking');
    }
}