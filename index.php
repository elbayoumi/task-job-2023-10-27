<?php

require_once "router.php";
require_once "./models/User.php";
use Routes\Route;

Route::get('/',['AdminController','login']);
Route::get('/home',['AdminController','index']);
Route::get('/login',['AdminController','login']);
Route::post('/sign',['AdminController','sign']);
$actions= $_SERVER['REQUEST_URI'];
Route::dispatch(
    $actions
);