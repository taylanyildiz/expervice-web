import { CompanyRegionFilter } from "@Models/index";
import BaseRepository from "./base_repository";
import CompanyRegion from "./end-points/company_region";
import { store } from "@Store/index";
import { setGroupInfo, setGroups, setRegions, setWeather } from "@Store/company_region_store";

class CompanyRegionRepository extends BaseRepository {
    constructor() {
        super({ tag: CompanyRegion.regions });
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
        const path = CompanyRegion.weather(region.id!);
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
        const path = CompanyRegion.groups(region.id!);
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
        const groupId = store.getState().compay_region.group?.id;
        const path = CompanyRegion.groupInfo;
        const response = await this.get(path, { params: { groupId } });
        const status = response.status;
        if (status !== 200) return;
        const data = response.data['data']['group'];
        store.dispatch(setGroupInfo(data));
    }
}


export default CompanyRegionRepository;