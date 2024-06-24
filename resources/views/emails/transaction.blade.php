<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Transaction Email</title>
    <style>
    </style>
</head>
<body>
    <div class="container">
        <img src="https://github.com/Adornadowilliam2/Images/blob/main/logo.jpg?raw=true" width="100px" alt="Logo">
        <h2>Thank you for Booking, {{ $user->username }}!</h2>
        
        <p>Thank you for booking with us. We are glad to have you on board.</p>
        <ul>
            <li>Room Name: {{ $room->name }}</li>
            <li>Room Price: ₱{{ $transaction->room_price }}</li>
            <li>Rent Start: {{ $transaction->rent_start }}</li>
            <li>Rent End: {{ $transaction->rent_end }}</li>
            @php
                $totalServPrice = 0;
            @endphp
            @foreach ($transaction->services as $service)
                <li>Service Name: {{ $service->name }} <span>- ₱{{ $service->price }}</span></li>
                @php
                    $totalServPrice += $service->price;
                @endphp
            @endforeach
            <li>Total Services Price: ₱{{ $totalServPrice }}</li>
            <li><strong>Total Amount: ₱{{ $transaction->room_price + $totalServPrice }}</strong></li>
        </ul>

        <p>If you have any questions, feel free to <a href="mailto:adornadowilliam@gmail.com">contact us</a>.</p>
        
        
        <p>Best regards,<br> 
           Villa Arora
        </p>
    </div>
</body>
</html>
