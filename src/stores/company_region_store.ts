import { CompanyGroup, CompanyGroupInfo, CompanyRegion, CompanyRegionWeather } from "@Models/index";
import { createSlice } from "@reduxjs/toolkit";

/// Company region props
interface Props {
    regions: {
        rows: CompanyRegion[];
        count: number;
    }
    region?: CompanyRegion | null;
    weather?: CompanyRegionWeather | null;
    groups: { rows: CompanyGroup[], count: number };
    group?: CompanyGroup | null;
    groupInfo?: CompanyGroupInfo | null;
    editRegion: CompanyRegion | null;
    editGroup: CompanyGroup | null;
}

/// Initial values
const initialState: Props = {
    regions: { count: 0, rows: [] },
    region: null,
    weather: null,
    groups: { rows: [], count: 0 },
    group: null,
    groupInfo: null,
    editRegion: null,
    editGroup: null,
}

/// Company region slice
const companyRegion = createSlice({
    name: "company_region",
    initialState,
    reducers: {
        setRegions: (state, { payload }) => {
            state.regions = payload;
            state.group = null;
            state.region = null;
            state.groups = { rows: [], count: 0 };
            state.group = null;
            state.groupInfo = null;
            if (payload.rows.length != 0) {
                state.region = payload.rows[0];
            }
        },
        setSelectedRegion: (state, { payload }) => {
            state.region = payload;
            state.groups = { rows: [], count: 0 };
            state.group = null;
            state.groupInfo = null;
        },
        setEditRegion: (state, { payload }) => {
            state.editRegion = payload;
        },
        setWeather: (state, { payload }) => {
            state.weather = payload;
        },
        setGroups: (state, { payload }) => {
            state.groups = payload;
            if (state.groups?.rows && state.groups.rows?.length != 0) {
                state.group = state.groups.rows[0];
            }
        },
        setSelectedGroup: (state, { payload }) => {
            state.group = payload;
        },
        setGroupInfo: (state, { payload }) => {
            state.groupInfo = payload;
        },
        setEditGroup: (state, { payload }) => {
            state.editGroup = payload;
        }
    }
});

export default companyRegion.reducer;
export const {
    setRegions,
    setSelectedRegion,
    setWeather,
    setGroups,
    setSelectedGroup,
    setGroupInfo,
    setEditRegion,
    setEditGroup,
} = companyRegion.actions;