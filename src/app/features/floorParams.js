import { createSlice } from "@reduxjs/toolkit";

const floorParamsSlice = createSlice({
    name: 'floorParams',
    initialState: { floorParams: undefined },
    reducers: {
        setFloorParams: (state, action) => {
            state.floorParams = action.payload;
            return state;
        }
    }
});

export const { setFloorParams } = floorParamsSlice.actions;

export const selectFloorParams = (state) => state.floorParams.floorParams;

export default floorParamsSlice.reducer;