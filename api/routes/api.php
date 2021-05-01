<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', fn() => response()->json(['message' => 'Welcome to API Távola Redonda.']));

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
    Route::get('/', [PostController::class, 'index']);
});

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    // Post
    Route::prefix('posts')->group(function () {
        Route::post('/create', [PostController::class, 'create']);
        Route::delete('/delete/{post}', [PostController::class, 'delete']);
        Route::put('/like/{post}/{value}', [PostController::class, 'like']);
        Route::get('/like/{post}', [PostController::class, 'likeStatus']);
    });
});

Route::fallback(fn() => response()->json([
    'message' => 'Not Found'
], 404));
