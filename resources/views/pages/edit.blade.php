@extends('layouts.app')

@section('content')

    <div class="container">

    <h3 class="text-center mt-5">Registration Update</h3>

        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">

            <div class="form-area">
                <form method="POST" action="{{ route('employee.update', $employee->id) }}">
                {!! csrf_field() !!}
                  @method("PATCH")
                    <div class="row">
                        <div class="col-md-6">
                            <label>Username</label>
                            <input type="text" class="form-control" name="user_name" value="{{ $employee->user_name }}">
                        </div>
                        <div class="col-md-6">
                            <label>Password</label>
                            <input type="password" class="form-control" name="password" value="{{ $employee->password }}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Mobile</label>
                            <input type="text" class="form-control" name="mobile" value="{{ $employee->mobile }}">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Email</label>
                            <input type="text" class="form-control" name="email" value="{{ $employee->email }}">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="role_id">Role_id</label>
                            <!-- <input type="text" class="form-control" name="role_id" value="{{ $employee->role_id }}"> -->
                            <select id="role_id" name="role_id" class="col-md-12">
                                <option value="guest" {{ $employee->role_id == 'guest' ? 'selected' : '' }}>Guest</option>
                                <option value="scheduler" {{ $employee->role_id == 'scheduler' ? 'selected' : '' }}>Scheduler</option>
                                <option value="admin" {{ $employee->role_id == 'admin' ? 'selected' : '' }}>Admin</option>
                            </select>


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