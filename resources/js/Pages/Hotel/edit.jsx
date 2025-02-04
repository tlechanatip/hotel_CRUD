import { router, useForm } from '@inertiajs/react';

export default function Edit({ booking }) {
    const { data, setData, put, errors } = useForm({
        customer_id: booking.customer_id,
        room_id: booking.room_id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        total_price: booking.total_price,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/booking/${booking.id}`);
    };

    const handleDelete = (b_id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/booking/${b_id}`);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Edit Booking</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Customer ID
                        </label>
                        <input
                            type="text"
                            value={data.customer_id}
                            onChange={(e) =>
                                setData('customer_id', e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Room ID
                        </label>
                        <input
                            type="text"
                            value={data.room_id}
                            onChange={(e) => setData('room_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            value={data.check_in_date}
                            onChange={(e) =>
                                setData('check_in_date', e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            value={data.check_out_date}
                            onChange={(e) =>
                                setData('check_out_date', e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Total Price
                        </label>
                        <input
                            type="number"
                            value={data.total_price}
                            onChange={(e) =>
                                setData('total_price', e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                    <button
                        className="w-full rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => handleDelete(booking.id)}
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}
