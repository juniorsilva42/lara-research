@extends('templates.app')
@extends('templates.navbar')

@section('default_html_content')
<div class="jumbotron">
    <h1 class="display-3">Tudo configurado. Bom Job!</h1>
    <p class="lead">JrSilva - Esqueleto de aplicações</p>
    
    <hr class="my-4">
    
    <p>Olá mundo! Esse é meu esqueleto básico para construir aplicações para à internet de alto desempenho.</p>
    
    <p class="lead">
         <button class="btn btn-primary btn-lg" onclick=";window.location.href=this.getAttribute('href');return false;" role="link" href="/info" title="Visualizar dados da Aplicação">Visualizar dados da Aplicação</button>
    </p>
</div>
@endsection 



