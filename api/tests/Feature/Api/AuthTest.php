<?php

namespace Tests\Feature\Api;

use App\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    private array $user = [
        'username' => 'Accolon',
        'password' => 'psyker99'
    ];
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegister()
    {
        $response = $this->postJson('api/auth/register', $this->user);

        $response
        ->assertStatus(201)
        ->assertJson([
            'message' => 'User created successfully'
        ]);
    }

    public function testLogin()
    {
        (new UserRepository)->createUser(new \App\Models\User($this->user));
        $response = $this->postJson('api/auth/login', $this->user);

        $response
        ->assertStatus(200)
        ->assertJson([
            'message' => "Login successful!"
        ]);
    }
}
