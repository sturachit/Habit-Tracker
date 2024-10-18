import React from 'react';

const HabitListItem = ({ habit }) => {
    const { name, progress, streak, motivationalMessage } = habit;

    return (
        <div className="flex flex-col flex-grow p-2">
            <span className="font-medium text-indigo-600 text-lg">{name}</span>
            <span className="text-sm text-gray-500">Progress: {progress}%</span>
            <span className="text-sm text-green-500">Current Streak: {streak} days</span>
            <span className="text-sm text-gray-400 italic">{motivationalMessage}</span>
        </div>
    );
};

export default HabitListItem;
