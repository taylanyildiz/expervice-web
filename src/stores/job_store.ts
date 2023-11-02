import Job from "@Models/job/job";
import { createSlice } from "@reduxjs/toolkit";

interface Props {
    layzLoading: boolean,
    jobFilter: JobFilter | null;
    jobs: { count: number, rows: Job[] },
    job: Job | null
    jobId: number | null,
}

const initialState: Props = {
    layzLoading: false,
    jobFilter: { limit: 10, offset: 0 },
    jobs: { count: 0, rows: [] },
    job: null,
    jobId: null,
}


const job = createSlice({
    initialState,
    name: 'job',
    reducers: {
        setJobLayzLoading: (state, { payload }) => {
            state.layzLoading = payload;
        },
        setJobFilter: (state, { payload }) => {
            state.jobFilter = payload;
        },
        setJobs: (state, { payload }) => {
            state.jobs = payload;
        },
        setJob: (state, { payload }) => {
            state.job = payload;
        },
        setJobId: (state, { payload }) => {
            state.jobId = payload;
        }
    },
});

export default job.reducer;
export const { setJob, setJobLayzLoading, setJobFilter, setJobs, setJobId } = job.actions;