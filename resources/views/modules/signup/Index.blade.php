@extends('templates.app')

@section('content')

      <div class="container">
            <h1 class="display-6">Entrar na lista</h1>
            <form method="POST" action="/">

                  <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">E-mail</label>
                        <div class="col-sm-10">
                              <input type="email" class="form-control" id="inputEmail3" placeholder="E-mail">
                        </div>
                  </div>

                  <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                              <button type="submit" name="signup_list" class="btn btn-primary">Inscrever-se</button>
                        </div>
                  </div>
            </form>
      </div>

@endsection
