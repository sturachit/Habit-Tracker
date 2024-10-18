import Suggestions from "./Suggestions";
import AddHabit from "./AddHabit";
import HabitListItem from "./HabitListItem"; 
import { useDispatch, useSelector } from "react-redux";
import { habitSelector, deleteHabit } from "../Redux/Reducer/habitReducer"; 
import { useState } from "react";

const Dashboard = () => {
    const { habits } = useSelector(habitSelector); 
    const dispatch = useDispatch();
    const [editingHabit, setEditingHabit] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteHabit(id)); 
    };

    const handleEdit = (habit) => {
        setEditingHabit(habit); 
    };

    return (
        <div className="w-full flex h-full justify-center my-2 bg-fixed overflow-auto">
            <div className="w-[90%] h-full flex flex-col md:flex-row items-start gap-4">

                <div className="w-full md:w-2/3 h-full flex flex-col items-center">
                    <AddHabit editingHabit={editingHabit} setEditingHabit={setEditingHabit}  />
                    <div className="w-full h-full mt-8 bg-[#f4faff] p-4 rounded shadow-md overflow-auto">
                        <h2 className="text-indigo-700 text-lg font-semibold text-center">
                            Your Daily Habits
                        </h2>
                        <div className="w-full">
                            {habits.length > 0 ? (
                                habits.map((habit) => (
                                    <div key={habit.id} className="flex justify-between items-center bg-[#BEADFA] p-2 my-1 rounded shadow">
                                        <HabitListItem habit={habit} />
                                        <button 
                                            onClick={() => handleEdit(habit)} 
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white p-1 rounded ml-2"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(habit.id)} 
                                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded ml-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="w-full text-center text-gray-500">
                                    Nothing in your habit list.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 h-full rounded bg-[#f4faff] shadow-md p-4 overflow-auto">
                    <Suggestions />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
