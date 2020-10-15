<?php

namespace App\Rules;

use App\Repositories\TagRepository;
use Illuminate\Contracts\Validation\Rule;

class TagsArray implements Rule
{
    private TagRepository $repository;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->repository = resolve(TagRepository::class);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!is_array($value)) {
            return false;
        }

        foreach ($value as $id) {
            if (!$this->repository->findById($id)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be id validate.';
    }
}
