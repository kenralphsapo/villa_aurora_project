<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Link</title>
    <style>
        span{
            background: "gray";
            color:"black";
        }
    </style>
</head>
<body>
    <p>Hello {{ $user->username }},</p>
    <p>You are receiving this email because we received a password reset request for your account.</p>
    <p>Please copy the following token:</p>
    <span>{{$token}}</span>
    <p>Then click the button below to reset your password:</p>
    <p><a href="https://localhost:5173/reset-password?email={{ urlencode($user->email) }}&token={{ $token }}" target="_blank">Reset Password</a></p>
    <p>If you did not request a password reset, no further action is required.</p>
    <p>Thank you!</p>
</body>
</html>
