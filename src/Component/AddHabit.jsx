import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, updateHabit, habitSelector, setSuggestionSelected } from "../Redux/Reducer/habitReducer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddHabit = ({ editingHabit, setEditingHabit }) => {
    const dispatch = useDispatch();
    const { habits, suggestionSelected } = useSelector(habitSelector);
    const [habitName, setHabitName] = useState('');
    const [progress, setProgress] = useState(0);
    const [streak, setStreak] = useState(0);
    const [motivationalMessage, setMotivationalMessage] = useState('');

    useEffect(() => {
        if (editingHabit) {
            setHabitName(editingHabit.name);
            setProgress(editingHabit.progress);
            setStreak(editingHabit.streak);
            setMotivationalMessage(editingHabit.motivationalMessage);
        } else if (suggestionSelected) {
            setHabitName(suggestionSelected.habit);
        } else {
            resetFields();
        }
    }, [editingHabit, suggestionSelected]);

    const resetFields = () => {
        setHabitName('');
        setProgress(0);
        setStreak(0);
        setMotivationalMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingHabit) {
            const updatedHabit = { ...editingHabit, name: habitName, progress, streak, motivationalMessage };
            dispatch(updateHabit(updatedHabit));
            toast.success('Habit updated successfully!');
        } else {
            const newDate = new Date().toString();
            const weekStatus = Array(7).fill(null);
            const newHabit = {
                id: habits.length,
                name: habitName,
                progress,
                streak,
                motivationalMessage,
                completedDays: 0,
                createdOn: `${newDate.slice(4, 15)}`,
                url: suggestionSelected ? `${suggestionSelected.url}` : 'https://freeiconshop.com/wp-content/uploads/edd/task-done-flat.png',
                weekStatus: weekStatus
            };
            dispatch(addHabit(newHabit));
            dispatch(setSuggestionSelected(null));
            toast.success('New Habit added successfully!');
        }
        resetFields();
        setEditingHabit(null);
    };

    return (
        <div className="w-full lg:w-4/5 h-screen bg-[#C5DFF8] rounded shadow-md flex flex-col p-2">
            <h1 className="text-indigo-700 text-lg font-semibold text-center mt-1">
                {editingHabit ? 'Edit Habit' : 'Add Habit'}
            </h1>
            <form onSubmit={handleSubmit} className="w-4/5 self-center border-t border-indigo-400">
                <label htmlFor="habit-name" className="font-semibold">Habit:</label>
                <input
                    type="text"
                    placeholder="Enter habit name..."
                    id="habit-name"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    required
                    className="w-full h-8 rounded my-2 px-1 font-semibold text-indigo-800"
                />
                <label htmlFor="progress" className="font-semibold">Progress (%):</label>
                <input
                    type="number"
                    placeholder="Enter progress..."
                    id="progress"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    required
                    className="w-full h-8 rounded my-2 px-1 font-semibold text-indigo-800"
                    min="0"
                    max="100"
                />
                <label htmlFor="streak" className="font-semibold">Current Streak:</label>
                <input
                    type="number"
                    placeholder="Enter streak..."
                    id="streak"
                    value={streak}
                    onChange={(e) => setStreak(e.target.value)}
                    required
                    className="w-full h-8 rounded my-2 px-1 font-semibold text-indigo-800"
                    min="0"
                />
                <label htmlFor="motivational-message" className="font-semibold">Motivational Message:</label>
                <input
                    type="text"
                    placeholder="Enter motivational message..."
                    id="motivational-message"
                    value={motivationalMessage}
                    onChange={(e) => setMotivationalMessage(e.target.value)}
                    required
                    className="w-full h-8 rounded my-2 px-1 font-semibold text-indigo-800"
                />
                <button
                    type="submit"
                    className="bg-[#9b80fc] hover:bg-indigo-500 rounded shadow-md p-1 mt-2 text-white font-medium float-right"
                >
                    {editingHabit ? 'Update Habit' : 'Add Habit'}
                </button>
            </form>
        </div>
    );
};

export default AddHabit;
