@extends('layouts.app')

@section('content')

<div class="container">

    <h3 align="center" class="mt-5">Login</h3>

    <div class="form-area">
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="row">
                <div class="col-md-12">
                    <label>Email</label>
                    <input type="email" class="form-control" name="email" required>
                    @error('email')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label>Password</label>
                    <input type="password" class="form-control" name="password" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mt-3">
                    <input type="submit" class="btn btn-info" value="Login">
                </div>
            </div>
        </form>
    </div>

</div>

@endsection
