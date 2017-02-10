<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('/categoria/{catId}', function($catId){
    return "Posts da categoria <b>{$catId}</b>";
});
