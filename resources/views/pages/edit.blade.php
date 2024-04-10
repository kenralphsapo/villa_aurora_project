@extends('layouts.app')

@section('content')

    <div class="container">

    <h3 class="text-center mt-5">Registration Update</h3>

        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">

            <div class="form-area">
                <form method="POST" action="{{ route('user.update', $user->id) }}">
                {!! csrf_field() !!}
                  @method("PATCH")
                    <div class="row">
                        <div class="col-md-6">
                            <label>Username</label>
                            <input type="text" class="form-control" name="user_name" value="{{ $user->username }}">
                        </div>
                        <div class="col-md-6">
                            <label>Password</label>
                            <input type="password" class="form-control" name="password" value="{{ $user->password }}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Mobile</label>
                            <input type="text" class="form-control" name="mobile" value="{{ $user->mobile }}">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Email</label>
                            <input type="text" class="form-control" name="email" value="{{ $user->email }}">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <input type="submit" class="btn btn-primary" value="Update">
                        </div>

                    </div>
                </form>
            </div>

            </div>
        </div>
    </div>

@endsection


@push('css')
    <style>
        .form-area{
            padding: 20px;
            margin-top: 20px;
            background-color:#b3e5fc;
        }

        .bi-trash-fill{
            color:red;
            font-size: 18px;
        }

        .bi-pencil{
            color:green;
            font-size: 18px;
            margin-left: 20px;
        }
    </style>
@endpush