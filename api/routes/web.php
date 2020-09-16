<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api/v1')->group(function () {
    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register'])->name('auth.register');
        Route::post('login', [AuthController::class, 'login'])->name('auth.login');
        Route::
            middleware(['auth:sanctum'])
            ->get('check', fn() => response()->json(['message' => 'Token valid']));
    });

    // Tag
    Route::prefix('tags')->group(function () {
        Route::get('/', [TagController::class, 'index'])->name('tags.index');
        Route::get('/{tag}', [TagController::class, 'show'])->where('id', '[0-9]+')->name('tags.show');
    });

    Route::prefix('posts')->group(function () {
        Route::get('/{post}', [PostController::class, 'show']);
    });
});

Route::middleware('auth:sanctum')->prefix('api/v1')->group(function () {
    // Post
    Route::prefix('posts')->group(function () {
        Route::post('/create', [PostController::class, 'create']);
    });
});

Route::fallback(fn() => response()->json([
    'message' => 'Not Found'
], 404));
