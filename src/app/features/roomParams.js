import { createSlice } from "@reduxjs/toolkit";

const roomParamsSlice = createSlice({
    name: 'roomParams',
    initialState: { roomParams: undefined },
    reducers: {
        setRoomParams: (state, action) => {
            state.roomParams = action.payload;
            return state;
        }
    }
});

export const { setRoomParams } = roomParamsSlice.actions;

export const selectRoomParams = (state) => state.roomParams.floorParams;

export default roomParamsSlice.reducer;