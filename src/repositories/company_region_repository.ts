import { CompanyGroup, CompanyRegion } from "@Models/index";
import BaseRepository from "./base_repository";
import CompanyRegionConst from "./end-points/company_region";
import { store } from "@Store/index";
import { setGroupInfo, setGroupsLoading, setGroups, setRegions, setRegionsLoading, setSelectedGroup, setSelectedRegion, setWeather, setGroupInfoLoading, setWeatherLoading, setGroupJobsInfo, setGroupJobsInfoLoading, setGroupUnitsInfoLoading, setGroupUnitsInfo } from "@Store/company_region_store";
import RegionProcess from "@Features/summary/base/entities/region_process";
import SnackCustomBar from "@Utils/snack_custom_bar";

class CompanyRegionRepository extends BaseRepository {
    constructor() {
        super({ tag: CompanyRegionConst.regions });
    }

    /**
     * Get Company Regions
     */
    public async getRegions(): Promise<void> {
        store.dispatch(setRegionsLoading(true));
        const response = await this.get("/");
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['regions'];
        store.dispatch(setRegionsLoading(false));
        store.dispatch(setRegions(data));
    }

    /**
     * Get region groups
     */
    public async getRegionWeather(regionId: number): Promise<void> {
        store.dispatch(setWeatherLoading(true));
        const path = CompanyRegionConst.weather(regionId);
        const response = await this.get(path);
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['weather'];
        store.dispatch(setWeather(data));
        store.dispatch(setWeatherLoading(false));
    }

    /**
     * Get region groups
     */
    public async getRegionGroups(regionId: number): Promise<void> {
        store.dispatch(setGroupsLoading(true));
        const path = CompanyRegionConst.groups(regionId);
        const response = await this.get(path);
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['groups'];
        store.dispatch(setGroups(data));
        store.dispatch(setGroupsLoading(false));
    }

    /**
     * Get group info
     */
    public async getGroupInfo(groupId: number): Promise<void> {
        store.dispatch(setGroupInfoLoading(true));
        store.dispatch(setGroupInfo(null));
        const path = CompanyRegionConst.groupInfo;
        const response = await this.get(path, { params: { group_id: groupId } });
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['group'];
        store.dispatch(setGroupInfo(data));
        store.dispatch(setGroupInfoLoading(false));
    }

    /**
     * Get group jobs info
     */
    public async getGroupJobsInfo(groupId: number): Promise<void> {
        store.dispatch(setGroupJobsInfoLoading(true));
        store.dispatch(setGroupJobsInfo(null));
        const filter = { ...store.getState().companyRegion.groupInfoFilter };
        const path = CompanyRegionConst.groupJobsInfo(groupId);
        delete filter.dateType;
        const response = await this.get(path, { params: filter });
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['jobs'];
        store.dispatch(setGroupJobsInfo(data));
        store.dispatch(setGroupJobsInfoLoading(false));
    }

    /**
     * Get group units job info
     */
    public async getGroupUnitsJobInfo(groupId: number): Promise<void> {
        store.dispatch(setGroupUnitsInfoLoading(true));
        store.dispatch(setGroupUnitsInfo(null));
        const filter = { ...store.getState().companyRegion.groupUnitsInfoFilter };
        const path = CompanyRegionConst.groupUnitsJobInfo(groupId);
        delete filter.dateType;
        const response = await this.get(path, { params: filter });
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['jobs'];
        store.dispatch(setGroupUnitsInfo(data));
        store.dispatch(setGroupUnitsInfoLoading(false));
    }

    /**
     * Create Company region
     */
    public async createRegion(region: RegionProcess): Promise<CompanyRegion | null> {
        const regions = store.getState().companyRegion.regions;
        let count = regions.count;
        const response = await this.post("/", region);
        const success = response.status === 200;
        SnackCustomBar.status(response);
        if (!success) return null;
        const data = response.data['data']['region'];
        store.dispatch(setRegions({
            rows: [...regions.rows, data],
            count: ++count,
        }));
        store.dispatch(setSelectedRegion(data));
        return data;
    }

    /**
     * Update Company region
     */
    public async updateRegion(region: RegionProcess): Promise<CompanyRegion | null> {
        const { regions, region: selected } = store.getState().companyRegion;
        if (!region.id) return null;
        const path = CompanyRegionConst.region(region.id);
        const response = await this.put(path, region);
        const success = response.status === 200;
        SnackCustomBar.status(response);
        if (!success) return null;
        const data = response.data['data']['region'];
        const values = [...regions.rows];
        const index = values.findIndex(e => e.id === data.id);
        if (index != -1) {
            values[index] = data;
            store.dispatch(setRegions({
                ...regions,
                rows: values,
            }));
        }
        if (selected?.id === region.id) {
            store.dispatch(setSelectedRegion(data));
        }
        return data;
    }

    /**
     * Delete Company region
     */
    public async deleteRegion(id: number): Promise<boolean> {
        const regions = store.getState().companyRegion.regions;
        let count = regions.count;
        const path = CompanyRegionConst.region(id);
        const response = await this.delete(path);
        const success = response.status === 200;
        if (!success) return false;
        SnackCustomBar.status(response);
        const values = [...regions.rows.filter((e) => e.id !== id)];
        store.dispatch(setRegions({
            rows: values,
            count: --count,
        }));
        if (values.length !== 0) {
            store.dispatch(setSelectedRegion(values[0]));
        } else {
            store.dispatch(setSelectedRegion(null));
        }
        return true;
    }

    /**
     * Create group
     */
    public async createGroup(name: string): Promise<CompanyGroup | null> {
        const { groups: { count, rows }, region } = store.getState().companyRegion;
        const path = CompanyRegionConst.groups(region!.id!);
        let total = count;
        const response = await this.post(path, { name });
        const success = response.status === 200;
        SnackCustomBar.status(response);
        if (!success) return null;
        const data = response.data['data']['group'];
        store.dispatch(setGroups({
            rows: [...rows, data],
            count: ++total,
        }));
        store.dispatch(setSelectedGroup(data));
        return data;
    }


    /**
     * Update group
     */
    public async updateGroup(name: string): Promise<CompanyGroup | null> {
        const { groups, editGroup, group } = store.getState().companyRegion;
        const path = CompanyRegionConst.group(editGroup!.id!);
        const response = await this.put(path, { name });
        const success = response.status === 200;
        SnackCustomBar.status(response);
        if (!success) return null;
        const data = response.data['data']['group'];
        const values = [...groups.rows];
        const index = values.findIndex(e => e.id === data.id);
        if (index != -1) {
            values[index] = data;
            store.dispatch(setGroups({
                ...groups,
                rows: values,
            }));
        }
        if (group?.id === data.id) {
            store.dispatch(setSelectedGroup(data));
        }
        return data;
    }


    /**
     * Delete Company group
     */
    public async deleteGroup(id: number): Promise<boolean> {
        const groups = store.getState().companyRegion.groups;
        let count = groups.count;
        const path = CompanyRegionConst.group(id);
        const response = await this.delete(path);
        const success = response.status === 200;
        if (!success) return false;
        SnackCustomBar.status(response);
        const values = [...groups.rows.filter((e) => e.id !== id)];
        store.dispatch(setGroups({
            rows: values,
            count: --count,
        }));
        if (values.length !== 0) {
            store.dispatch(setSelectedGroup(values[0]));
        } else {
            store.dispatch(setSelectedGroup(null));
        }
        return true;
    }

}


export default CompanyRegionRepository;