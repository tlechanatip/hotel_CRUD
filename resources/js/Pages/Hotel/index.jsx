import Navbar from '@/Components/Navbar';
import { Link, router } from '@inertiajs/react';
import Pagination from '/resources/js/Components/Pagination'; // Import คอมโพเนนต์ Pagination
import { useState } from "react";


export default function Index({ booking, sort_by, order, query }) {
    const [currentSortBy, setCurrentSortBy] = useState(sort_by || 'id');
    const [currentOrder, setCurrentOrder] = useState(order || 'asc');
    const [search, setSearch] = useState(query || '');


    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/booking', {
            search,
            sort_by: currentSortBy,
            order: currentOrder,
        });
    };

    const handleSort = (column) => {
        const newOrder =
            currentSortBy === column && currentOrder === 'asc' ? 'desc' : 'asc';
        setCurrentSortBy(column);
        setCurrentOrder(newOrder);
        router.get('/booking', { search, sort_by: column, order: newOrder });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search,
                sort_by: currentSortBy,
                order: currentOrder,
            });
        }
    };

    const handleDelete = (b_id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/booking/${b_id}`);
        }
    };


    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-4xl p-6">
                <form
                    onSubmit={handleSearch}
                    className="mb-6 flex justify-center gap-4"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search booking..."
                        className="w-1/2 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
                    >
                        Search
                    </button>
                </form>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                {[
                                    { key: 'id', label: 'ID' },
                                    {
                                        key: 'customer_id',
                                        label: 'customer_id',
                                    },
                                    { key: 'room_id', label: 'room_id' },
                                    { key: 'check_in_date', label: 'check_in' },
                                    {
                                        key: 'check_out_date',
                                        label: 'check_out',
                                    },
                                    { key: 'action', label: 'Action' },
                                ].map((col) => (
                                    <th
                                        key={col.key}
                                        className="cursor-pointer border border-gray-200 px-4 py-2 text-left"
                                        onClick={() => handleSort(col.key)}
                                    >
                                        {col.label}{' '}
                                        {currentSortBy === col.key &&
                                            (currentOrder === 'asc'
                                                ? '▲'
                                                : '▼')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {booking.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-4 text-center text-gray-500"
                                    >
                                        ไม่พบข้อมูล
                                    </td>
                                </tr>
                            ) : (
                                booking.data.map((book) => (
                                    <tr
                                        key={book.id}
                                        className="odd:bg-white even:bg-gray-50"
                                    >
                                        <td className="border border-gray-200 px-4 py-2">
                                            {book.id}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {book.customer_id}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {book.room_id}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {book.check_in_date}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {book.check_out_date}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/booking/${book.id}/edit`}
                                                    className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(book.id)
                                                    }
                                                    className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-center">
                    <Pagination
                        links={booking.links}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
}
