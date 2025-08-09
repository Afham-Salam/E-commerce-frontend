import React, { useEffect, useState } from 'react';
import APIClientPrivate from '../utils/axios';
import Loader from '../components/Loader';

export default function ViewUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await APIClientPrivate.get('/api/user/all');
        setData(response.data.users);
    
        console.log(data); // Log the data right after fetching
        console.log(response.data.users); 
      } catch (error) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to fetch only once when component mounts

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Loading users..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.length === 0 ? (
          <div className="text-center text-xl">No users found.</div>
        ) : (
          data.map((it) => (
            <div
              key={it._id}
              className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-4">
               
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{it.name}</h2>
                <p className="text-lg text-gray-600 mb-2">Email: {it.email}</p>
                <p className="text-md text-gray-600 mb-2">Role: {it.role}</p>
                <p className="text-md text-gray-600 mb-4">
                  Joined: {new Date(it.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}

       
      </div>
    </div>
  );
}
