<?php

namespace Database\Factories;

use App\Models\RoomType;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Room::class;

    public function definition()
    {
        return [
            'room_id' => RoomType::query()->inRandomOrder()->value('id') ?? RoomType::factory(), // สร้างข้อมูล room_type_id จาก RoomType factory
            'room_number' => $this->faker->unique()->numberBetween(101, 999),
            'capacity' => $this->faker->numberBetween(1, 4),
        ];
    }

}
