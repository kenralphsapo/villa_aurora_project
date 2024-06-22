@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Sent Registration Confirmation Emails</h1>

        <table class="table">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Sent At</th>
                    <th>Subject</th>
                </tr>
            </thead>
            <tbody>
                @foreach($sentEmails as $sentEmail)
                <tr>
                    <td>{{ $sentEmail->user_id }}</td>
                    <td>{{ $sentEmail->recipient_email }}</td>
                    <td>{{ $sentEmail->sent_at}}</td>
                    <td>{{ $sentEmail->subject }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
