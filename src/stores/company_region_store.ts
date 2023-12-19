import GroupInfoFilter from "@Features/summary/base/entities/group_info_filter";
import GroupUnitsInfoFilter from "@Features/summary/base/entities/group_units_info_filter";
import { CompanyGroupJobInfo, CompanyGroupUnitsInfo } from "@Models/company-region/company_group_info";
import { ECustomDate } from "@Models/enums";
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
    groupJobsInfoLoading: boolean;
    groupJobsInfo: CompanyGroupJobInfo[] | null,
    groupInfo?: CompanyGroupInfo | null;
    groupUnitsInfoLoading: boolean;
    groupUnitsInfoDrawerStatus: boolean;
    groupUnitsInfoFilter: GroupUnitsInfoFilter;
    groupUnitsInfo?: CompanyGroupUnitsInfo[] | null;
    groupInfoFilterDrawerStatus: boolean,
    groupInfoFilter: GroupInfoFilter | null;
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
    groupJobsInfoLoading: true,
    groupJobsInfo: null,
    groupInfo: null,
    groupInfoFilterDrawerStatus: false,
    groupInfoFilter: {
        dateType: ECustomDate.Past30,
        start_date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        end_date: new Date(),
    },
    groupUnitsInfoDrawerStatus: false,
    groupUnitsInfoFilter: {
        dateType: ECustomDate.Past30,
        start_date: undefined,
        end_date: undefined,
        sub_type_id: undefined,
    },
    groupUnitsInfoLoading: true,
    groupUnitsInfo: null,
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
            const rows = payload?.rows;
            if (rows) {
                if (rows?.length === 0) {
                    state.region = null;
                } else {
                    const index = rows?.findIndex((e: any) => e.id === state.region?.id);
                    if (index === -1) state.region = rows[0];
                    else state.region ??= rows[0];
                }
            }
        },
        setSelectedRegion: (state, { payload }) => {
            state.region = payload;
            state.groupInfo = null;
            state.weather = null;
            state.group = null;
            state.groupInfoLoading = true;
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
            const rows = payload?.rows;
            if (rows) {
                if (rows?.length === 0) {
                    state.group = null;
                } else {
                    const index = rows?.findIndex((e: any) => e.id === state.group?.id);
                    if (index === -1) state.group = rows[0];
                    else state.group ??= rows[0];
                }
            }
        },
        setSelectedGroup: (state, { payload }) => {
            state.group = payload;
        },
        setGroupInfoLoading: (state, { payload }) => {
            state.groupInfoLoading = payload;
        },
        setGroupJobsInfoLoading: (state, { payload }) => {
            state.groupJobsInfoLoading = payload;
        },
        setGroupJobsInfo: (state, { payload }) => {
            state.groupJobsInfo = payload;
        },
        setGroupInfo: (state, { payload }) => {
            state.groupInfo = payload;
        },
        setGroupUnitsInfoLoading: (state, { payload }) => {
            state.groupUnitsInfoLoading = payload;
        },
        setGroupUnitsInfoDrawerStatus: (state, { payload }) => {
            state.groupUnitsInfoDrawerStatus = payload;
        },
        setGroupUnitsInfo: (state, { payload }) => {
            state.groupUnitsInfo = payload;
        },
        setGroupUnitsInfoFilter: (state, { payload }) => {
            state.groupUnitsInfoFilter = payload;
        },
        setEditGroup: (state, { payload }) => {
            state.editGroup = payload;
        },
        setGroupInfoFilterDrawerStatus: (state, { payload }) => {
            state.groupInfoFilterDrawerStatus = payload;
        },
        setGroupInfoFilter: (state, { payload }) => {
            state.groupInfoFilter = payload;
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
    setGroupJobsInfoLoading,
    setGroupInfo,
    setGroupJobsInfo,
    setEditRegion,
    setEditGroup,
    setGroupInfoFilterDrawerStatus,
    setGroupInfoFilter,
    setGroupUnitsInfoLoading,
    setGroupUnitsInfoDrawerStatus,
    setGroupUnitsInfo,
    setGroupUnitsInfoFilter,
} = companyRegion.actions;