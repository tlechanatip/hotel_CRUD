<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Booking::class;

    public function definition()
    {
        return [
            'customer_id' => $this->faker->randomNumber(1, 140),
            'room_id' => Room::query()->inRandomOrder()->value('id') ?? Room::factory(),
            'check_in_date' => $this->faker->date,
            'check_out_date' => $this->faker->date,
            'total_price' => $this->faker->randomFloat(2, 100, 1000),
        ];
    }
}
