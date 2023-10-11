import { Language, UserRole } from "@Models/index";
import PermissionResource from "@Models/permission/permission_resource";
import RolePermission from "@Models/permission/role_permission";
import UserRoleType from "@Models/user_role_type";
import { createSlice } from "@reduxjs/toolkit"

/// Constant Props
interface Props {
    languages: Language[],
    permissions: PermissionResource[],
    rolePermissons: RolePermission[],
    userRoles: UserRole[],
    userRoleTypes: UserRoleType[],
}

/// Constant Initial States
const initialStates: Props = {
    languages: [],
    permissions: [],
    userRoles: [],
    userRoleTypes: [],
    rolePermissons: [],
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
        }
    },
});


export default constants.reducer;
export const {
    setLanguages,
    setPermissions,
    setRolePermissions,
    setUserRoleTypes,
    setUserRoles
} = constants.actions;