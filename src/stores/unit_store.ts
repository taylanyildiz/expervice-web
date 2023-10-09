import Unit from "@Models/units/unit";
import { createSlice } from "@reduxjs/toolkit";

/// Unit store props
interface Props {
    groupUnits: { rows: Unit[], count: number }
}

/// Unit initial states
const initialState: Props = {
    groupUnits: { rows: [], count: 0 },
}

/// Unit slice
const unit = createSlice({
    name: "unit",
    initialState,
    reducers: {
        setGroupUnits: (state, { payload }) => {
            state.groupUnits = payload;
        }
    }
});

export default unit.reducer;
export const { setGroupUnits } = unit.actions;