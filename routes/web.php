<?php

Route::get('/', 'DefaultSite\SiteController@index');
Route::resource('/pokemons', 'DefaultSite\PokemonsController');
