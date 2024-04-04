@extends('layouts.app')

@section('content')

    <div class="container">

    <h3 class="text-center mt-5">Registration</h3>
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

            <div class="form-area">
                <form method="POST" action="{{ route('employee.store') }}">
                    @csrf
                    <div class="row">
                        <div class="col-md-6">
                            <label>Username</label>
                            <input type="text" class="form-control" name="user_name" required>
                        </div>
                        <div class="col-md-6">
                            <label>Password</label>
                            <input type="password" class="form-control" name="password" required>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Mobile</label>
                            <input type="text" class="form-control" name="mobile" maxlength="11" required>

                        </div>
                        <div class="col-md-6">
                            <label>Email</label>
                            <input type="email" class="form-control" name="email" required>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                        <label for="role_id">Choose an option:</label>
                        <select id="role_id" name="role_id" class="col-md-12">
                          <option value="guest">Guest</option>
                          <option value="scheduler">Scheduler</option>
                          <option value="admin">Admin</option>
                        </select>


                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <input type="submit" class="btn btn-info" value="Register">
                        </div>

                    </div>
                </form>
            </div>

                <table class="table mt-5">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role_id</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                        @foreach ( $employees as $key => $employee )

                        <tr>
                            <td scope="col">{{ ++$key }}</td>
                            <td scope="col">{{ $employee->user_name }}</td>
                            <td scope="col">{{ $employee->password }}</td>
                            <td scope="col">{{ $employee->mobile }}</td>
                            <td scope="col">{{ $employee->email }}</td>
                            <td scope="col">{{ $employee->role_id }}</td>
                            <td scope="col">

                            <a href="{{  route('employee.edit', $employee->id) }}">
                            <button class="btn btn-primary btn-sm">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                            </button>
                            </a>
                            
                            <form action="{{ route('employee.destroy', $employee->id) }}" method="POST" style ="display:inline">
                             @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                            </form>
                            </td>

                          </tr>

                        @endforeach




                    </tbody>
                  </table>
            </div>
        </div>
    </div>

@endsection


@push('css')
    <style>
        *{
            padding: 0;
            margin: 0;
        }

        .form-area{
            padding: 20px;
            margin-top: 20px;
              background-color: lightgreen;
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