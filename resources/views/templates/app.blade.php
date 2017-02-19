<!doctype html>
<html class="no-js" lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minha aplicação</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="{{ elixir('static/css/app-illuminate.css') }}">
    <meta name="ts-csrf-token" content="{{ csrf_token() }}">
</head>
<body>

    <header class="main-header">
        <img src="{{URL::asset('/static/images/logo.png')}}" alt="ThreeSoft Logo" width="341" height="86">
    </header>

    @yield('content')

    <script src="{{ elixir('static/js/app-illuminate.js') }}"></script>
</body>
</html>
