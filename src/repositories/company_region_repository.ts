import { CompanyRegion, CompanyRegionFilter } from "@Models/index";
import BaseRepository from "./base_repository";
import CompanyRegionConst from "./end-points/company_region";
import { store } from "@Store/index";
import { setGroupInfo, setGroups, setRegions, setSelectedRegion, setWeather } from "@Store/company_region_store";
import RegionProcess from "@Features/summary/base/entities/region_process";
import SnackCustomBar from "@Utils/snack_custom_bar";

class CompanyRegionRepository extends BaseRepository {
    constructor() {
        super({ tag: CompanyRegionConst.regions });
    }

    /**
     * Get Company Regions
     */
    public async getRegions(filter?: CompanyRegionFilter): Promise<void> {
        const response = await this.get("/", { params: filter });
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['regions'];
        store.dispatch(setRegions(data));
    }

    /**
     * Get region groups
     */
    public async getRegionWeather(): Promise<void> {
        const region = store.getState().compay_region.region;
        if (!region) return;
        const path = CompanyRegionConst.weather(region.id!);
        const response = await this.get(path);
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['weather'];
        store.dispatch(setWeather(data));
    }

    /**
     * Get region groups
     */
    public async getRegionGroups(): Promise<void> {
        const region = store.getState().compay_region.region;
        if (!region) return;
        const path = CompanyRegionConst.groups(region.id!);
        const response = await this.get(path);
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['groups'];
        store.dispatch(setGroups(data));
    }

    /**
     * Get group info
     */
    public async getGroupInfo(): Promise<void> {
        const group_id = store.getState().compay_region.group?.id;
        const path = CompanyRegionConst.groupInfo;
        const response = await this.get(path, { params: { group_id } });
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['group'];
        store.dispatch(setGroupInfo(data));
    }

    /**
     * Create Company region
     */
    public async createRegion(region: RegionProcess): Promise<CompanyRegion | null> {
        const regions = store.getState().compay_region.regions;
        let count = regions.count;
        const path = "/";
        const response = await this.post(path, region);
        const success = response.status === 200;
        if (!success) return null;
        SnackCustomBar.status(response);
        const data = response.data['data']['region'];
        store.dispatch(setRegions({
            rows: [...regions.rows, data],
            count: ++count,
        }));
        return data;
    }

    /**
     * Update Company region
     */
    public async updateRegion(region: RegionProcess): Promise<CompanyRegion | null> {
        const { regions, region: selected } = store.getState().compay_region;
        if (!region.id) return null;
        const path = `/${region.id}`;
        const response = await this.put(path, region);
        const success = response.status === 200;
        if (!success) return null;
        SnackCustomBar.status(response);
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
        const regions = store.getState().compay_region.regions;
        let count = regions.count;
        const path = `/${id}`;
        const response = await this.delete(path);
        const success = response.status === 200;
        if (!success) return false;
        SnackCustomBar.status(response);
        const values = [...regions.rows.filter((e) => e.id !== id)];
        store.dispatch(setRegions({
            rows: values,
            count: --count,
        }));
        return true;
    }
}


export default CompanyRegionRepository;