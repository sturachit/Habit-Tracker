import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    habits: JSON.parse(localStorage.getItem('habits')) || [], // Load from local storage
    suggestionSelected: null,
    showStatus: null,
    
};

const habitSlice = createSlice({
    name: 'habitTracker',
    initialState,
    reducers: {
        addHabit: (state, action) => {
            const newHabit = {
                ...action.payload,
                reminders: [],
            };
            state.habits.push(newHabit);
            state.showStatus = null;
            localStorage.setItem('habits', JSON.stringify(state.habits)); // Save to local storage
        },
        
        updateHabit: (state, action) => {
            const updatedHabit = action.payload;
            state.habits = state.habits.map((habit) =>
                habit.id === updatedHabit.id ? updatedHabit : habit
            );
            localStorage.setItem('habits', JSON.stringify(state.habits)); // Save to local storage
        },
        
        deleteHabit: (state, action) => {
            const habitId = action.payload;
            state.habits = state.habits.filter((habit) => habit.id !== habitId);
            localStorage.setItem('habits', JSON.stringify(state.habits)); // Save to local storage
        },

        setSuggestionSelected: (state, action) => {
            state.suggestionSelected = action.payload;
        },
        
        setShowStatus: (state, action) => {
            state.showStatus = action.payload;
        },

        toggleHabitStatus: (state, action) => {
            const { habitIndex, dayIndex, status } = action.payload;

            if (state.showStatus === null) {
                state.showStatus = state.habits[habitIndex];
            }

            if (status) {
                if (state.showStatus.weekStatus[dayIndex]) {
                    return;
                }
                state.showStatus.completedDays++;
            } else if (status === false) {
                if (state.showStatus.weekStatus[dayIndex] === false) {
                    return;
                } else if (state.showStatus.weekStatus[dayIndex]) {
                    state.showStatus.completedDays--;
                }
            } else {
                if (state.showStatus.weekStatus[dayIndex] === null) {
                    return;
                } else if (state.showStatus.weekStatus[dayIndex]) {
                    state.showStatus.completedDays--;
                }
            }

            state.showStatus.weekStatus[dayIndex] = status;
            const newHabits = state.habits.filter((habit) => habit.id !== state.showStatus.id);
            state.habits = [...newHabits, state.showStatus];
            localStorage.setItem('habits', JSON.stringify(state.habits)); // Save to local storage
        },

        addReminder: (state, action) => {
            const { habitId, reminder } = action.payload;
            const habit = state.habits.find(h => h.id === habitId);
            if (habit) {
                habit.reminders.push(reminder);
                localStorage.setItem('habits', JSON.stringify(state.habits)); // Save to local storage
            }
        },
        
        removeReminder: (state, action) => {
            const { habitId, reminderId } = action.payload;
            const habit = state.habits.find(h => h.id === habitId);
            if (habit) {
                habit.reminders = habit.reminders.filter(reminder => reminder.id !== reminderId);
                localStorage.setItem('habits', JSON.stringify(state.habits)); // Save to local storage
            }
        },
    },
});

export const habitReducer = habitSlice.reducer;
export const { 
    addHabit, 
    updateHabit, 
    deleteHabit, 
    setSuggestionSelected, 
    setShowStatus, 
    toggleHabitStatus, 
    addReminder, 
    removeReminder 
} = habitSlice.actions;

export const habitSelector = (state) => state.habitReducer;
