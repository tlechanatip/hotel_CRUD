import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    Hotel Booking
                </div>
                <div className="flex space-x-4"> {/* ใช้ flex และ space-x-4 */}
                    <a href="/booking" className="text-white hover:text-blue-200">Booking</a>
                    <a href="/booking/pie" className="text-white hover:text-blue-200">PieChart</a>
                    <a href="/booking/create" className="text-white hover:text-blue-200">Create</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
