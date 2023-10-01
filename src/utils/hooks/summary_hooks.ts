import { createSlice } from "@reduxjs/toolkit"

/// Summary store props
interface Props {
    leftSideBarStatus: boolean,
}

/// Summary initial states
const initialState: Props = {
    leftSideBarStatus: true,
}


/// Summary slice
const summary = createSlice({
    name: "summary",
    initialState,
    reducers: {
        setLeftSideBarStatus: (state, { payload }) => {
            state.leftSideBarStatus = payload;
        }
    }
});

export default summary.reducer;
export const { setLeftSideBarStatus } = summary.actions;