<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use LaravelFCM\Facades\FCM;

class TransactionSuccessfulNotification extends Notification
{
    public function via($notifiable)
    {
        return ['fcm'];
    }

    public function toFcm($notifiable)
    {
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60 * 20);

        $notificationBuilder = new PayloadNotificationBuilder('Transaction Successful');
        $notificationBuilder->setBody('Your transaction was successful.')
                            ->setSound('default');

        $option = $optionBuilder->build();
        $notification = $notificationBuilder->build();

        $fcmToken = $notifiable->device_token;

        return FCM::sendTo($fcmToken, $option, $notification);
    }
}
