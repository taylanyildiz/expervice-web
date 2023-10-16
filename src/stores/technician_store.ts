import TechnicianFilter from "@Models/technician-user/technician_filter";
import TechnicianUser from "@Models/technician-user/technician_user";
import { createSlice } from "@reduxjs/toolkit";

/// Technician store props
interface Props {
    layzLoading: boolean;
    filter: TechnicianFilter;
    technicians: { rows: TechnicianUser[], count: number };
    technician: TechnicianUser | null;
};

/// Initial states
const initialState: Props = {
    layzLoading: true,
    filter: { limit: 10, offset: 0 },
    technicians: { rows: [], count: 0 },
    technician: null,
}

/// Technician slice
const technician = createSlice({
    name: 'technician',
    initialState,
    reducers: {
        setTechnicianLayz: (state, { payload }) => {
            state.layzLoading = payload;
        },
        setFilter: (state, { payload }) => {
            state.filter = payload;
        },
        setTechnicians: (state, { payload }) => {
            state.technicians = payload;
        },
        setTechnician: (state, { payload }) => {
            state.technician = payload;
        }
    }
});


export default technician.reducer;
export const { setTechnicianLayz, setFilter, setTechnicians, setTechnician } = technician.actions;