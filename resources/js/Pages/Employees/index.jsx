import { router } from "@inertiajs/react";
import { useState } from "react";
import Pagination from "/resources/js/Components/Pagination" // Import คอมโพเนนต์ Pagination
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ employees, query, sort_by, order }) {
    const [search, setSearch] = useState(query || '');
    const [currentSortBy, setCurrentSortBy] = useState(sort_by || 'emp_no');
    const [currentOrder, setCurrentOrder] = useState(order || 'asc');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employees', { search, sort_by: currentSortBy, order: currentOrder });
    };

    const handleSort = (column) => {
        const newOrder = currentSortBy === column && currentOrder === 'asc' ? 'desc' : 'asc';
        setCurrentSortBy(column);
        setCurrentOrder(newOrder);
        router.get('/employees', { search, sort_by: column, order: newOrder });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, { search, sort_by: currentSortBy, order: currentOrder });
        }
    };

    return (
        <AuthenticatedLayout>
        <div className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSearch} className="mb-6 flex justify-center gap-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search employees..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Search
                </button>
            </form>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            {[
                                { key: 'emp_no', label: 'ID' },
                                { key: 'first_name', label: 'Name' },
                                { key: 'last_name', label: 'Last Name' },
                                { key: 'gender', label: 'Gender' },
                                { key: 'birth_date', label: 'Birthday' },
                                { key: 'age', label: 'Age' }
                            ].map((col) => (
                                <th
                                    key={col.key}
                                    className="border border-gray-200 px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort(col.key)}
                                >
                                    {col.label} {currentSortBy === col.key && (currentOrder === 'asc' ? '▲' : '▼')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-4">
                                    ไม่พบข้อมูล
                                </td>
                            </tr>
                        ) : (
                            employees.data.map((employee) => (
                                <tr key={employee.emp_no} className="odd:bg-white even:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">{employee.emp_no}</td>
                                    <td className="border border-gray-200 px-4 py-2">{employee.first_name}</td>
                                    <td className="border border-gray-200 px-4 py-2">{employee.last_name}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {employee.gender === 'M' ? 'Male' : 'Female'}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{employee.birth_date}</td>
                                    <td className="border border-gray-200 px-4 py-2">{employee.age}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                <Pagination links={employees.links} onPageChange={handlePageChange} />
            </div>
        </div>
        </AuthenticatedLayout>
    );

}
