import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { habitSelector, addReminder, removeReminder } from '../Redux/Reducer/habitReducer';

const NotificationPanel = ({ closePanel }) => {
    const [reminderText, setReminderText] = useState('');
    const [timer, setTimer] = useState(0);
    const habits = useSelector(habitSelector);
    const dispatch = useDispatch();

    const handleRemoveReminder = (habitId, reminderId) => {
        dispatch(removeReminder({ habitId, reminderId }));
    };

    const handleAddTimerReminder = (habitId) => {
        const reminderId = Date.now();
        const newReminder = {
            id: reminderId,
            text: reminderText,
            time: `${timer} seconds`,
        };

        dispatch(addReminder({ habitId, reminder: newReminder }));

        setTimeout(() => {
            alert(`Reminder: ${reminderText}`);
            dispatch(removeReminder({ habitId, reminderId }));
        }, timer * 1000);

        setReminderText('');
        setTimer(0);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closePanel}></div>

            <div className="w-full sm:w-80 bg-white shadow-lg p-4 rounded-md fixed right-0 top-0 h-screen overflow-y-auto z-50">
                <h2 className="text-xl font-bold mb-4">Habit Reminders</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={reminderText}
                        onChange={(e) => setReminderText(e.target.value)}
                        placeholder="Enter reminder text"
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="number"
                        value={timer}
                        onChange={(e) => setTimer(e.target.value)}
                        placeholder="Enter timer in seconds"
                        className="border p-2 w-full mb-2"
                    />
                    <button 
                        onClick={() => handleAddTimerReminder(habits[0]?.id)} 
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Set Timer Reminder
                    </button>
                </div>

                {habits.length > 0 ? (
                    habits.map(habit => (
                        habit.reminders.length > 0 && (
                            <div key={habit.id} className="mb-4">
                                <h3 className="text-lg font-semibold">{habit.name}</h3>
                                <ul className="ml-4 mt-2">
                                    {habit.reminders.map(reminder => (
                                        <li key={reminder.id} className="flex justify-between items-center">
                                            <div>
                                                <p>{reminder.text}</p>
                                                <small className="text-gray-500">{reminder.time}</small>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveReminder(habit.id, reminder.id)} 
                                                className="text-red-500 ml-4 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))
                ) : (
                    <p className="text-gray-500">No reminders set yet.</p>
                )}
            </div>
        </>
    );
};

export default NotificationPanel;
