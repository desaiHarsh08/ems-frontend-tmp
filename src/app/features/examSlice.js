import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
    name: 'exam',
    initialState: { examSelected: JSON.parse(localStorage.getItem('exam')) || {examName: '', examDate: '', examTime: '', examLocations: []} },
    reducers: {
        setExam: (state, action) => {
            localStorage.setItem('exam', JSON.stringify(action.payload.exam));
            state.examSelected = action.payload.exam;
            return state;
        }
    }
});

export const { setExam } = examSlice.actions;

export default examSlice.reducer;