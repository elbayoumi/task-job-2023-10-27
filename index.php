<?php

require_once "router.php";
require_once "./models/Affiliate.php";
use Routes\Route;

Route::get('/',['AdminController','index']);
Route::get('/home',['AdminController','index']);
Route::get('/login',['AdminController','login']);
// Route::get('/dataClient',['ClientController','dataClient']);
// Route::post('/data',['ClientController','data']);

// Route::post('/adminStoreData',function () {
//     Route::redirect('AdminController','adminStoreData');
// });
// ///create new Affiliate
// Route::post('/create',['AdminController','store']);
// Route::get('/client',function () {
//     Route::redirect('ClientController','index');
// });
// Route::post('/clientData',function () {
//     Route::redirect('ClientController','data');
// });

$actions= $_SERVER['REQUEST_URI'];
Route::dispatch(
    $actions
);