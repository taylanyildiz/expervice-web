import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import UnitConst from "./end-points/unit";
import { setUnit, setUnitLayz, setUnits } from "@Store/unit_store";
import SnackCustomBar from "@Utils/snack_custom_bar";

class UnitRepository extends BaseRepository {
    constructor() {
        super({ tag: UnitConst.units });
    }

    /**
     * Get Units of company
     */
    public async getUnits(): Promise<boolean> {
        const { filter } = store.getState().unit;
        store.dispatch(setUnitLayz(true));
        const response = await this.get("/", { params: filter });
        store.dispatch(setUnitLayz(false));
        if (response.success) {
            const data = response.data['data']['units'];
            store.dispatch(setUnits(data));
        }
        return response.success;
    }

    /**
     * Get Unit by id
     */
    public async getUnitById(id: number): Promise<boolean> {
        const path = UnitConst.unit(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success })
        if (success) {
            const data = response.data['data']['unit'];
            store.dispatch(setUnit(data));
        }
        return success;
    }
}

export default UnitRepository;