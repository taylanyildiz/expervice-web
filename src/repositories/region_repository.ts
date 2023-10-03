
import { setCities, setCountries, setStates } from "@Store/region_store";
import BaseRepository from "./base_repository";
import Region from "./end-points/region";
import { store } from "@Store/index";

class RegionRepository extends BaseRepository {
    constructor() {
        super({ tag: Region.region });
    }

    /**
     * Get Countires
     */
    public async getCountires(): Promise<void> {
        const path = Region.countries;
        const response = await this.get(path);
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']?.['countries'];
        store.dispatch(setCountries(data));
    }

    /**
     * Get States of country
     */
    public async getStates(countryId: number): Promise<void> {
        const path = Region.states;
        const query = { country_id: countryId };
        const response = await this.get(path, { params: query });
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['states'];
        store.dispatch(setStates(data));
    }

    /**
     * Get Cities of state
     */
    public async getCities(stateId: number): Promise<void> {
        const path = Region.cities;
        const query = { state_id: stateId };
        const response = await this.get(path, { params: query });
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['cities'];
        store.dispatch(setCities(data));
    }
}

export default RegionRepository;