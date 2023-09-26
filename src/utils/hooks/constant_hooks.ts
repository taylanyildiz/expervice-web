import { Language } from "@Models/index";
import { createSlice } from "@reduxjs/toolkit"

/// Constant Props
interface Props {
    languages: Array<Language>,
}

/// Constant Initial States
const initialStates: Props = {
    languages: [],
}

/// Constants slice
const constants = createSlice({
    name: 'constants',
    initialState: initialStates,
    reducers: {
        setLanguages: (state, { payload }) => {
            state.languages = payload;
        }
    },
});


export default constants.reducer;
export const { setLanguages } = constants.actions;