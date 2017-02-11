<?php

Route::group(['namespace' => 'DefaultSite'], function(){

    Route::get('/categoria/{id}', 'SiteController@categoria');

    Route::get('/', 'SiteController@index');
    Route::get('/fale-conosco', 'SiteController@fale_conosco');

});

Route::group(['namespace' => 'Console'], function(){
    Route::get('/console', 'ConsoleController@index');
});
