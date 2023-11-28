import { createSlice } from "@reduxjs/toolkit"

/// Summary store props
interface Props {
    leftSideBarStatus: boolean,
    commonSideBar: boolean,
    summarySidebar: boolean,
}

/// Summary initial states
const initialState: Props = {
    leftSideBarStatus: true,
    commonSideBar: false,
    summarySidebar: false,
}


/// Summary slice
const summary = createSlice({
    name: "summary",
    initialState,
    reducers: {
        setLeftSideBarStatus: (state, { payload }) => {
            state.leftSideBarStatus = payload;
        },
        setCommonSideBar: (state, { payload }) => {
            state.commonSideBar = payload;
        },
        setSummarySideBar: (state, { payload }) => {
            state.summarySidebar = payload;
        }
    }
});

export default summary.reducer;
export const { setLeftSideBarStatus, setCommonSideBar, setSummarySideBar } = summary.actions;