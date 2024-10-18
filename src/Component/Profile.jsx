// Profile.jsx
import React from 'react';
import { useUser } from "../Data/userContext";

const Profile = () => {
    const { user, loading } = useUser(); // Access user and loading state from context

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#C5DFF8]">
                <p className="text-center text-gray-500">Loading user profile...</p>
            </div>
        ); 
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#C5DFF8]">
                <p className="text-center text-gray-500">No user data available. Please log in.</p>
            </div>
        ); 
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#C5DFF8]">
            <div className="w-full lg:w-3/4 max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-indigo-700 text-2xl font-semibold text-center mb-6">Profile Information</h1>
                <div className="mb-4">
                    <p className="text-lg"><strong>Name:</strong> {user.name}</p>
                    <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                </div>
                <h3 className="mt-4 text-lg font-semibold">Personal Goals:</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {user.personalGoals && user.personalGoals.length > 0 ? (
                        user.personalGoals.map((goal, index) => (
                            <li key={index} className="text-md text-gray-800">{goal}</li>
                        ))
                    ) : (
                        <li className="text-md text-gray-600">No personal goals set.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
