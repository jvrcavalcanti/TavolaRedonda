<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string("title")->unique();
            $table->text("content");
            $table->json("tags");
            $table->unsignedBigInteger("like")->default(0);
            $table->unsignedBigInteger("dislike")->default(0);
            $table->enum("status", ["safe", "under analysis", "deleted"]);
            $table->timestamps();
        });

        Schema::table("posts", function (Blueprint $table) {
            $table->foreignid("user_id")
                  ->constrained()
                  ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
