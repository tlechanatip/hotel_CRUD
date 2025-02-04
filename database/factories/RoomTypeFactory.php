<?php

namespace Database\Factories;

use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomType>
 */
class RoomTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = RoomType::class;

    public function definition()
    {
        return [
            'type_name' => $this->faker->word,
            'price_per_night' => $this->faker->randomFloat(2, 100, 500),
        ];
    }
}
