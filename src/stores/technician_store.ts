import { ETechnicianFilterType } from "@Features/summary/users/technician-users/entities/technician_enums";
import TechnicianJobsFilter from "@Features/summary/users/technician-users/entities/technician_jobs_filter";
import JobTechnician from "@Models/job/job_technician";
import TechnicianFilter from "@Models/technician-user/technician_filter";
import TechnicianJobRole from "@Models/technician-user/technician_job_role";
import TechnicianJobStatus from "@Models/technician-user/technician_job_status";
import TechnicianUser from "@Models/technician-user/technician_user";
import { createSlice } from "@reduxjs/toolkit";

/// Technician store props
interface Props {
    layzLoading: boolean;
    filter: TechnicianFilter;
    technicians: { rows: TechnicianUser[], count: number };
    technician: TechnicianUser | null;
    technicianJobs: { rows: JobTechnician[], count: number };
    technicianFilterDrawerStatus: false,
    technicianJobsFilter: TechnicianJobsFilter,
    technicianJobRoles: TechnicianJobRole[] | null,
    technicianJobStatuses: TechnicianJobStatus[] | null,
};

/// Initial states
const initialState: Props = {
    layzLoading: true,
    filter: {
        page: 0,
        limit: 10,
        offset: 0,
        filter_type: ETechnicianFilterType.FirstName,
        statuses: [],
        group_roles: [1, 2, 3]
    },
    technicians: { rows: [], count: 0 },
    technician: null,
    technicianJobs: { rows: [], count: 0 },
    technicianFilterDrawerStatus: false,
    technicianJobsFilter: { limit: 10, offset: 0, },
    technicianJobRoles: null,
    technicianJobStatuses: null,
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
        },
        setTechnicianJobs: (state, { payload }) => {
            state.technicianJobs = payload;
        },
        setTechnicianFilterDrawerStatus: (state, { payload }) => {
            state.technicianFilterDrawerStatus = payload;
        },
        setTechnicianJobsFilter: (state, { payload }) => {
            state.technicianJobsFilter = payload;
        },
        setTechnicianJobRoles: (state, { payload }) => {
            state.technicianJobRoles = payload;
        },
        setTechnicianJobStatuses: (state, { payload }) => {
            state.technicianJobStatuses = payload;
        }
    }
});


export default technician.reducer;
export const {
    setTechnicianLayz,
    setFilter,
    setTechnicians,
    setTechnician,
    setTechnicianJobs,
    setTechnicianFilterDrawerStatus,
    setTechnicianJobsFilter,
    setTechnicianJobRoles,
    setTechnicianJobStatuses,
} = technician.actions;