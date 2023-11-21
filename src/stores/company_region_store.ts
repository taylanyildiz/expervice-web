import { CompanyGroup, CompanyGroupInfo, CompanyRegion, CompanyRegionWeather } from "@Models/index";
import { createSlice } from "@reduxjs/toolkit";

/// Company region props
interface Props {
    regionsLoading: boolean;
    regions: {
        rows: CompanyRegion[];
        count: number;
    }
    region?: CompanyRegion | null;
    weatherLoading: boolean;
    weather?: CompanyRegionWeather | null;
    groupsLoading: boolean;
    groups: { rows: CompanyGroup[], count: number };
    group?: CompanyGroup | null;
    groupInfoLoading: boolean;
    groupInfo?: CompanyGroupInfo | null;
    editRegion: CompanyRegion | null;
    editGroup: CompanyGroup | null;
}

/// Initial values
const initialState: Props = {
    regionsLoading: true,
    groupsLoading: true,
    regions: { count: 0, rows: [] },
    weatherLoading: true,
    region: null,
    weather: null,
    groups: { rows: [], count: 0 },
    group: null,
    groupInfoLoading: true,
    groupInfo: null,
    editRegion: null,
    editGroup: null,
}

/// Company region slice
const companyRegion = createSlice({
    name: "company_region",
    initialState,
    reducers: {
        setRegionsLoading: (state, { payload }) => {
            state.regionsLoading = payload;
        },
        setRegions: (state, { payload }) => {
            state.regions = payload;
            state.group = null;
            state.region = null;
            state.groups = { rows: [], count: 0 };
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
            state.groupsLoading = true;
            state.weatherLoading = true;
        },
        setEditRegion: (state, { payload }) => {
            state.editRegion = payload;
        },
        setWeatherLoading: (state, { payload }) => {
            state.weatherLoading = payload;
        },
        setWeather: (state, { payload }) => {
            state.weather = payload;
        },
        setGroupsLoading: (state, { payload }) => {
            state.groupsLoading = payload;
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
        setGroupInfoLoading: (state, { payload }) => {
            state.groupInfoLoading = payload;
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
    setRegionsLoading,
    setRegions,
    setSelectedRegion,
    setWeatherLoading,
    setWeather,
    setGroupsLoading,
    setGroups,
    setSelectedGroup,
    setGroupInfoLoading,
    setGroupInfo,
    setEditRegion,
    setEditGroup,
} = companyRegion.actions;