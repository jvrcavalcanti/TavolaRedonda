<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

// $router->get('/key', function() {
//     return \Illuminate\Support\Str::random(32);
// });

$router->group(["prefix" => "auth"], function () use ($router) {
    $router->post('register', "AuthController@register");
    $router->post("login", "AuthController@login");
});

$router->group(["prefix" => "post"], function () use ($router) {
  $router->get("list", "PostController@index");
  $router->get("search", "PostController@search");
  $router->get("show/{id}", "PostController@show");
});

$router->group(['middleware' => "auth"], function () use ($router) {
    $router->get("/auth/test", fn() => response()->json(["message" => "Token valid :)"]));

    $router->group(["prefix" => "post"], function () use ($router) {
      $router->post("register", "PostController@create");
      $router->put("like", "PostController@like");
      $router->put("dislike", "PostController@dislike");
    });
});