import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Constant from "./end-points/constant";
import { setFieldTypes, setGroupRoles, setJobPriorities, setJobRoles, setJobStatuses, setJobSubTypes, setJobTypes, setLanguages, setPermissions, setRolePermissions, setUnitLabels, setUnitSubTypes, setUnitTypes, setUserRoleTypes, setUserRoles } from "@Store/constant_store";
import JobStatus from "@Models/job/job_status";
import UnsubscriptionReason from "@Models/unsubscription_reason";

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

    /**
     * Get Job Sub Types
     */
    public async getJobSubTypes(): Promise<void> {
        const path = Constant.jobSubTypes;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['job_sub_types'];
        store.dispatch(setJobSubTypes(data));
    }

    /**
     * Get Job Types
     */
    public async getJobTypes(): Promise<void> {
        const path = Constant.jobTypes;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['job_types'];
        store.dispatch(setJobTypes(data));
    }

    /**
     * Get Job Roles
     */
    public async getJobRoles(): Promise<void> {
        const path = Constant.jobRoles;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['job_roles'];
        store.dispatch(setJobRoles(data));
    }

    /**
     * Get Job Priorities
     */
    public async getJobPriorities(): Promise<void> {
        const path = Constant.jobPriorities;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['priorities'];
        store.dispatch(setJobPriorities(data));
    }

    /**
     * Get Field Types
     */
    public async getFieldTypes(): Promise<void> {
        const path = Constant.fieldTypes;
        const response = await this.get(path);
        if (!response.success) return;
        const data = response.data['data']['field_types'];
        store.dispatch(setFieldTypes(data));
    }

    /**
     * Get Job Statuses
     */
    public async getJobStatuses(props?: { job_type?: number, status_id?: number, forForm?: boolean }): Promise<JobStatus[] | null> {
        const path = Constant.jobStatuses;
        const response = await this.get(path, { params: props });
        if (!response.success) return null;
        const data = response.data['data']['job_statuses'];
        store.dispatch(setJobStatuses(data));
        return data;
    }

    /**
     * Get Unsubscription Reaons
     */
    public async getUnsubReasons(): Promise<UnsubscriptionReason[] | null> {
        const path = Constant.unsubReasons;
        const response = await this.get(path);
        return response.data?.['data']?.['reasons'];
    }

}

export default ConstantRepository;