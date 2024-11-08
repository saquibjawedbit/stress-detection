// Dashboard.jsx
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Image from 'next/image';
import Sidebar from './Sidebar';

const users = [
  { name: 'Saquib Jawed', rollNo: 'BTECH/10260/23', image: '/anish234.jpg' },
  { name: 'Anish Mehta', rollNo: 'BTECH/10242/23', image: '/anish234.jpg' },
  { name: 'Ayush Aditya', rollNo: 'BTECH/10155/23', image: '/anish234.jpg' },
];

const Dashboard = () => {
  const router = useRouter();

  const handleCardClick = (user) => {
    router.push(`/details?name=${user.name}&rollNo=${user.rollNo}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-900 text-white p-6 flex flex-col">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <nav className="bg-white py-4 shadow flex justify-end px-6 space-x-4 border-b border-gray-300">
          <button className="flex items-center bg-gray-800 px-4 py-2 rounded-md text-white hover:bg-gray-700">
            <AiOutlineUserAdd size={20} className="mr-2" />
            Add User
          </button>
          <div className="flex space-x-3 items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
        </nav>
        
        {/* Header Image */}
        <div className="container mx-auto px-4 py-4">
          <Image src="/frame1.png" alt="image" width={800} height={80} />
        </div>

        {/* User Cards */}
        <div className="container mx-auto py-8 px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Student List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-gray-700 text-white rounded-lg shadow-lg p-6 text-center cursor-pointer hover:bg-gray-600"
                onClick={() => handleCardClick(user)}
              >
                <Image
                  src={user.image}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 mx-auto rounded-full mb-4 border border-gray-500"
                />
                <h3 className="text-xl font-semibold text-gray-100">{user.name}</h3>
                <p className="text-gray-300">Roll No: {user.rollNo}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-4 mt-8">
          <p>© 2023 CampusHealthTracker. All rights reserved.</p>
          <div className="text-sm text-gray-400 mt-2">
            <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
