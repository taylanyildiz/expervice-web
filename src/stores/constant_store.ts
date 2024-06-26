import FieldType from "@Models/form/field_type";
import { Language, UserRole } from "@Models/index";
import JobPriority from "@Models/job/job_priority";
import JobRole from "@Models/job/job_role";
import JobStatus from "@Models/job/job_status";
import JobSubType from "@Models/job/job_sub_type";
import JobType from "@Models/job/job_type";
import PermissionResource from "@Models/permission/permission_resource";
import RolePermission from "@Models/permission/role_permission";
import GroupRole from "@Models/technician-user/group_role";
import UnitLabel from "@Models/units/unit_label";
import UnitSubType from "@Models/units/unit_sub_type";
import UnitType from "@Models/units/unit_type";
import UserRoleType from "@Models/user_role_type";
import { createSlice } from "@reduxjs/toolkit"

/// Constant Props
interface Props {
    languages: Language[],
    permissions: PermissionResource[],
    rolePermissons: RolePermission[],
    userRoles: UserRole[],
    userRoleTypes: UserRoleType[],
    groupRoles: GroupRole[],
    unitTypes: UnitType[],
    unitSubTypes: UnitSubType[],
    unitLabels: UnitLabel[],
    jobStatuses: JobStatus[],
    jobTypes: JobType[],
    jobSubTypes: JobSubType[],
    jobRoles: JobRole[],
    jobPriorities: JobPriority[],
    fieldTypes: FieldType[],
}

/// Constant Initial States
const initialStates: Props = {
    languages: [],
    permissions: [],
    userRoles: [],
    userRoleTypes: [],
    rolePermissons: [],
    groupRoles: [],
    unitTypes: [],
    unitSubTypes: [],
    unitLabels: [],
    jobStatuses: [],
    jobTypes: [],
    jobSubTypes: [],
    jobRoles: [],
    jobPriorities: [],
    fieldTypes: [],
}

/// Constants slice
const constants = createSlice({
    name: 'constants',
    initialState: initialStates,
    reducers: {
        setLanguages: (state, { payload }) => {
            state.languages = payload;
        },
        setPermissions: (state, { payload }) => {
            state.permissions = payload;
        },
        setUserRoleTypes: (state, { payload }) => {
            state.userRoleTypes = payload;
        },
        setUserRoles: (state, { payload }) => {
            state.userRoles = payload;
        },
        setRolePermissions: (state, { payload }) => {
            state.rolePermissons = payload;
        },
        setGroupRoles: (state, { payload }) => {
            state.groupRoles = payload;
        },
        setUnitTypes: (state, { payload }) => {
            state.unitTypes = payload;
        },
        setUnitSubTypes: (state, { payload }) => {
            state.unitSubTypes = payload;
        },
        setUnitLabels: (state, { payload }) => {
            state.unitLabels = payload;
        },
        setJobStatuses: (state, { payload }) => {
            state.jobStatuses = payload;
        },
        setJobTypes: (state, { payload }) => {
            state.jobTypes = payload;
        },
        setJobSubTypes: (state, { payload }) => {
            state.jobSubTypes = payload;
        },
        setJobRoles: (state, { payload }) => {
            state.jobRoles = payload;
        },
        setJobPriorities: (state, { payload }) => {
            state.jobPriorities = payload;
        },
        setFieldTypes: (state, { payload }) => {
            state.fieldTypes = payload;
        }
    },
});


export default constants.reducer;
export const {
    setLanguages,
    setPermissions,
    setRolePermissions,
    setUserRoleTypes,
    setUserRoles,
    setGroupRoles,
    setUnitTypes,
    setUnitSubTypes,
    setUnitLabels,
    setJobStatuses,
    setJobTypes,
    setJobSubTypes,
    setJobRoles,
    setJobPriorities,
    setFieldTypes,
} = constants.actions;