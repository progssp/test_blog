<?php

use Illuminate\Support\Facades\Route;

Route::post('/login','App\Http\Controllers\AppController@login');
Route::post('/register','App\Http\Controllers\AppController@register');

Route::middleware('verify.user.auth')->prefix('user')->group(function(){
    Route::post('/create-post','App\Http\Controllers\AppController@create_post');
    Route::post('/update-post','App\Http\Controllers\AppController@update_post');
    Route::post('/delete-post','App\Http\Controllers\AppController@delete_post');

    
    Route::post('/get-all-blog-posts','App\Http\Controllers\AppController@get_all_posts');
    Route::post('/get-post','App\Http\Controllers\AppController@get_post');
    Route::post('/get-posts-by-tag','App\Http\Controllers\AppController@get_posts_by_tag');
    
});
















Route::get('/csrf-token','App\Http\Controllers\AppController@get_csrf_token');