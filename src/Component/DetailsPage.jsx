import React, { useState, useEffect } from "react";
import { useUser } from "../Data/userContext"; 
import { useNavigate } from "react-router-dom"; 

const DetailsPage = () => {
    const { user, setUser } = useUser();
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const newDate = new Date().toString();
        setDate(newDate.slice(0, 15));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Update user data in context
        setUser((prev) => ({
            ...prev,
            name: e.target.name.value,
            email: e.target.email.value,
            personalGoals: e.target.personalGoals.value.split(","),
        }));

        setLoading(false);
        navigate('/profile'); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#C5DFF8] p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name="name"
                            placeholder="Enter your name"
                            required
                            className="mt-1 block w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="mt-1 block w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="personalGoals" className="block text-sm font-medium text-gray-700">Personal Goals</label>
                        <input
                            name="personalGoals"
                            placeholder="Goals (comma-separated)"
                            required
                            className="mt-1 block w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full h-10 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DetailsPage;
