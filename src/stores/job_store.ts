import { EJobFilterType } from "@Features/summary/jobs/entities/job_enums";
import { ECustomDate } from "@Models/enums";
import Job from "@Models/job/job";
import JobFilter from "@Models/job/job_filter";
import { createSlice } from "@reduxjs/toolkit";

interface Props {
    layzLoading: boolean,
    jobFilter: JobFilter;
    jobsFilterDrawerStatus: boolean;
    jobs: { count: number, rows: Job[] },
    jobDialogStatus: boolean;
    job: Job | null
    jobId: number | null,
}

const initialState: Props = {
    layzLoading: false,
    jobsFilterDrawerStatus: false,
    jobFilter: {
        page: 0,
        limit: 10,
        offset: 0,
        filter_type: EJobFilterType.UnitName,
        dateType: ECustomDate.All,
    },
    jobs: { count: 0, rows: [] },
    jobDialogStatus: false,
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
        setJobsFilterDrawerStatus: (state, { payload }) => {
            state.jobsFilterDrawerStatus = payload;
        },
        setJobFilter: (state, { payload }) => {
            state.jobFilter = payload;
        },
        setJobs: (state, { payload }) => {
            state.jobs = payload;
        },
        setJobDialogStatus: (state, { payload }) => {
            state.jobDialogStatus = payload;
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
export const {
    setJobLayzLoading,
    setJobsFilterDrawerStatus,
    setJobFilter,
    setJobs,
    setJobDialogStatus,
    setJob,
    setJobId
} = job.actions;