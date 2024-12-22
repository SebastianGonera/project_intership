<?php

use App\Http\Controllers\AcquisitionChannelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AcquisitionChannelController::class)
    ->group(function () {
        Route::get('/acquisition-channels', 'index');
        Route::post('/acquisition-channels', 'store');
        Route::put('/acquisition-channels/{name}', 'update');
        Route::delete('/acquisition-channels/{name}', 'destroy');
    });
