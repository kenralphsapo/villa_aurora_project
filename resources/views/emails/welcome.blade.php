<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome Email</title>
</head>
<body>
    <h2>Welcome to Our Website, {{ $user->username }}!</h2>
    
    <p>Thank you for registering with us. We are glad to have you on board.</p>
    
    <p>If you have any questions, feel free to <a href="mailto:adornadowilliam@gmail.com">contact us</a>.</p>
    
    <p>Best regards,<br> 
       Villa Arora
    </p>
</body>
</html>
