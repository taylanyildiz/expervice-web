import { EUnitFilterType } from "@Features/summary/units/entities/unit_enums";
import { ECustomDate } from "@Models/enums";
import Job from "@Models/job/job";
import TechnicianUser from "@Models/technician-user/technician_user";
import Unit from "@Models/units/unit";
import UnitFilter from "@Models/units/unit_filter";
import UnitJobsFilter from "@Models/units/unit_jobs_filter";
import { createSlice } from "@reduxjs/toolkit";

/// Unit store props
interface Props {
    layzLoading: boolean;
    unitsFilterDrawerStatus: boolean;
    filter: UnitFilter | null;
    units: { rows: Unit[], count: number },
    unit: Unit | null;
    unitDialogStatus: boolean;
    unitId: number | null;
    technicians: TechnicianUser[],
    jobsFilter: UnitJobsFilter | null,
    jobs: { rows: Job[], count: number } | null;
    selectedUnits: number[];
}

/// Unit initial states
const initialState: Props = {
    layzLoading: true,
    unitsFilterDrawerStatus: false,
    filter: {
        page: 0,
        limit: 10,
        offset: 0,
        filter_type: EUnitFilterType.Name,
        dateType: ECustomDate.All
    },
    units: { rows: [], count: 0 },
    unit: null,
    unitDialogStatus: false,
    unitId: null,
    technicians: [],
    jobsFilter: { limit: 10, offset: 0 },
    jobs: null,
    selectedUnits: [],
}

/// Unit slice
const unit = createSlice({
    name: "unit",
    initialState,
    reducers: {
        setUnitLayz: (state, { payload }) => {
            state.layzLoading = payload;
        },
        setUnitsFilterDrawer: (state, { payload }) => {
            state.unitsFilterDrawerStatus = payload;
        },
        setUnitFilter: (state, { payload }) => {
            state.filter = payload;
        },
        setUnits: (state, { payload }) => {
            state.units = payload;
        },
        setUnitDialogStatus: (state, { payload }) => {
            state.unitDialogStatus = payload;
        },
        setUnit: (state, { payload }) => {
            state.unit = payload;
            if (!payload) {
                state.jobs = null;
                state.jobsFilter = { limit: 10, offset: 0 };
            }
        },
        setUnitId: (state, { payload }) => {
            state.unitId = payload;
        },
        setAvailableTechnicians: (state, { payload }) => {
            state.technicians = payload;
        },
        setUnitJobsFilter: (state, { payload }) => {
            state.jobsFilter = payload;
        },
        setUnitJobs: (state, { payload }) => {
            state.jobs = payload;
        },
        setSelectedUnits: (state, { payload }) => {
            state.selectedUnits = payload;
        }
    }
});

export default unit.reducer;
export const {
    setUnitLayz,
    setUnitsFilterDrawer,
    setUnitFilter,
    setUnits,
    setUnitDialogStatus,
    setUnit,
    setUnitId,
    setAvailableTechnicians,
    setUnitJobs,
    setUnitJobsFilter,
    setSelectedUnits,
} = unit.actions;