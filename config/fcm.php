<?php

return [
    'fcm' => [
        'driver' => env('FCM_PROTOCOL', 'http'),
        'log_enabled' => false,

        'http' => [
            'server_key' => env('FCM_SERVER_KEY', 'BB5HQJGw8p1tRZ-QCYgJPNwC3d6Tp6KMJbikMPXKTErogYoBdafxJBJJY604tzpCTwtAE3Ekas40rgPK54Qrcws'),
            'sender_id' => env('FCM_SENDER_ID', '972765548964'),
            'server_send_url' => 'https://fcm.googleapis.com/fcm/send',
            'server_group_url' => 'https://android.googleapis.com/gcm/notification',
            'server_topic_url' => 'https://iid.googleapis.com/iid/v1/',
            'timeout' => 30.0, // in seconds
        ],
    ],

    // Other third-party services configurations...
];
