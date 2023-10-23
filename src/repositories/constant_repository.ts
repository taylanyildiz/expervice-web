import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Constant from "./end-points/constant";
import { setGroupRoles, setLanguages, setPermissions, setRolePermissions, setUnitLabels, setUnitSubTypes, setUnitTypes, setUserRoleTypes, setUserRoles } from "@Store/constant_store";

class ConstantRepository extends BaseRepository {
    constructor() {
        super({ tag: Constant.constants });
    }

    /**
     * Get Languages
     */
    public async getLanguages(): Promise<void> {
        const path = Constant.languages;
        const response = await this.get(path);
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['languages'];
        store.dispatch(setLanguages(data));
    }

    /**
     * Get Permission Resources
     */
    public async getPermissionResources(): Promise<void> {
        const path = Constant.permissions;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['permissions'];
        store.dispatch(setPermissions(data));
    }

    /**
     * Get Role Permissions
     */
    public async getRolePermissions(): Promise<void> {
        const path = Constant.rolePermissions;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['role_permissions'];
        store.dispatch(setRolePermissions(data));
    }

    /**
     * Get User Role Types
     */
    public async getUserRoleTypes(): Promise<void> {
        const path = Constant.roleTypes;
        const response = await this.get(path);
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['role_types'];
        store.dispatch(setUserRoleTypes(data));
    }

    /**
     * Get User Roles
     * @params id filter by user role type id 
     */
    public async getUserRoles(id?: number): Promise<void> {
        const path = Constant.roles;
        const response = await this.get(path, { params: { type_id: id } });
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['user_roles'];
        store.dispatch(setUserRoles(data));
    }

    /**
     * Get Group Roles
     */
    public async getGroupRoles(): Promise<void> {
        const path = Constant.groupRoles;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['group_roles'];
        store.dispatch(setGroupRoles(data));
    }

    /**
     * Get Unit Types
     */
    public async getUnitTypes(): Promise<void> {
        const path = Constant.unitTypes;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['unit_types'];
        store.dispatch(setUnitTypes(data));
    }

    /**
     * Get Unit Sub Types
     */
    public async getUnitSubTypes(): Promise<void> {
        const path = Constant.unitsubTypes;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['unit_sub_types'];
        store.dispatch(setUnitSubTypes(data));
    }

    /**
     * Get Unit Labels
     */
    public async getUnitLabels(): Promise<void> {
        const path = Constant.unitLabels;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['unit_labels'];
        store.dispatch(setUnitLabels(data));
    }

}

export default ConstantRepository;