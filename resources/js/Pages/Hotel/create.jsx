import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import FlashMessage from "@/Components/FlashMessage";

export default function Create({ roomtype }) {
    const { data, setData, post, errors } = useForm({
        customer_id: '',
        room_id: '',
        check_in_date: '',
        check_out_date: '',
        total_price: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('booking.store')); // ส่งข้อมูลไปยังstore
    };


    return (
        <>
            <Navbar />
            <FlashMessage flash={flashMessage} />
            <h1 className="p-6 text-center text-3xl font-bold">
                Create Booking
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg"
            >
                <div className="mb-4">
                    <label
                        htmlFor="customer_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        customer_id:
                    </label>
                    <input
                        type="text"
                        id="customer_id"
                        value={data.customer_id}
                        onChange={(e) => setData('customer_id', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.customer_id && (
                        <span className="text-sm text-red-500">
                            {errors.customer_id}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        room_id:
                    </label>
                    <input
                        type="text"
                        id="room_id"
                        value={data.room_id}
                        onChange={(e) => setData('room_id', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.room_id && (
                        <span className="text-sm text-red-500">
                            {errors.room_id}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="check_in_date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Check_in:
                    </label>
                    <input
                        type="date"
                        id="check_in_date"
                        value={data.check_in_date}
                        onChange={(e) =>
                            setData('check_in_date', e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.check_in_date && (
                        <span className="text-sm text-red-500">
                            {errors.check_in_date}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="hire_date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Check_out:
                    </label>
                    <input
                        type="date"
                        id="check_out_date"
                        value={data.check_out_date}
                        onChange={(e) =>
                            setData('check_out_date', e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.check_out_date && (
                        <span className="text-sm text-red-500">
                            {errors.check_out_date}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="customer_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        total_price:
                    </label>
                    <input
                        type="text"
                        id="total_price"
                        value={data.total_price}
                        onChange={(e) => setData('total_price', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.total_price && (
                        <span className="text-sm text-red-500">
                            {errors.total_price}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create
                </button>
            </form>
        </>
    );
}
