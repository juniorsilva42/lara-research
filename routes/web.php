<?php

Route::get('/', 'DefaultSite\SiteController@index');
Route::get('/pokemons/tests', 'DefaultSite\PokemonsController@tests');
Route::resource('/pokemons', 'DefaultSite\PokemonsController');

Route::get('/signup', function(){
    return view('modules.signup.index');
});

Route::get('/info', function(){
    return view('modules.info.index');
});
