<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Transaction Email</title>
    <style>
    </style>
</head>
<body>
    <div>
        <img src="https://github.com/Adornadowilliam2/Images/blob/main/logo.jpg?raw=true" width="100px" alt="Logo">
        <h2>Thank you for Booking, {{ $user->username }}!</h2>
        <h4>And your Transaction ID: {{$transaction->id}}</h4>
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
        
        <p>Can now pay to this GCash QR:</p>
        <img src="https://github.com/Adornadowilliam2/Images/blob/main/gcash.png?raw=true" alt="GCash QR Code" width="400px">

        <p>Best regards,<br> 
           Villa Arora
        </p>
        
        <h4><a href="http://localhost:5173/?transaction_id={{ urlencode($transaction->id) }}" target="_blank">Also, you can rate our site by clicking here</a></h4>
    </div>
</body>
</html>