import { createSlice } from "@reduxjs/toolkit";

/// Region props
interface Props {
    countries: [],
    states: [],
    cities: [],
};

/// Region initial states
const initialState: Props = {
    countries: [],
    states: [],
    cities: []
};

/// Region slice
const region = createSlice({
    name: "region",
    initialState,
    reducers: {
        setCountries: (state, { payload }) => {
            state.countries = payload;
        },
        setStates: (state, { payload }) => {
            state.states = payload;
        },
        setCities: (state, { payload }) => {
            state.cities = payload;
        }
    },
});


export default region.reducer;
export const { setCities, setCountries, setStates } = region.actions;