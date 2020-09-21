<?php

namespace App\Repositories;

use App\Models\Like;

class LikeRepository
{
    public function create(bool $value, int $user_id, int $post_id)
    {
        return Like::create([
            'value' => $value,
            'user_id' => $user_id,
            'post_id' => $post_id
        ]);
    }

    public function findByIds(int $user_id, int $post_id): ?Like
    {
        return Like::where('user_id', $user_id)->where('post_id', $post_id)->first();
    }

    public function exists(int $user_id, int $post_id): bool
    {
        return !!$this->findByIds($user_id, $post_id);
    }

    public function changeValue(int $user_id, int $post_id)
    {
        $like = $this->findByIds($user_id, $post_id);

        if (is_null($like)) {
            return false;
        }

        $like->value = !$like->value;
        return $like->save();
    }

    public function delete(int $user_id, int $post_id)
    {
        return $this->findByIds($user_id, $post_id)->delete();
    }
}
