<!doctype html>
<html class="no-js" lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minha aplicação</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="{{ asset(elixir('static/css/app-illuminate.css')) }}">
    <meta name="ts-csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    @yield('default_html_content')
    
    <script src="{{ asset(elixir('static/js/app-illuminate.js')) }}"></script>
</body>
</html>
