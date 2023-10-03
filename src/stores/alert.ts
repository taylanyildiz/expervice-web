import { createSlice } from "@reduxjs/toolkit";

/// Alert props
interface Props {
    loadingStatus: boolean;
}

/// Alert initial state
const initialState: Props = {
    loadingStatus: false,
};

/// Alert slice
const alert = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setLoadingDialog: (state, { payload }) => {
            state.loadingStatus = payload;
        }
    }
});

export default alert.reducer;
export const { setLoadingDialog } = alert.actions;