import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import UnitConst from "./end-points/unit";
import { setUnit, setUnitLayz, setUnits } from "@Store/unit_store";
import SnackCustomBar from "@Utils/snack_custom_bar";
import UnitProcess from "@Features/summary/units/entities/unit_process";
import Unit from "@Models/units/unit";
import { UnitUpdate } from "@Features/summary/units/entities/unit_update";

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

    /**
     * Create Unit
     */
    public async createUnit(unit: UnitProcess): Promise<Unit | null> {
        const path = "/";
        const response = await this.post(path, unit);
        SnackCustomBar.status(response);
        const success = response.success;
        if (!success) return null;
        const data = response.data['data']['unit'];
        return data;
    }

    /**
     * Update Unit info
     */
    public async updateUnit(unit: UnitUpdate): Promise<Unit | null> {
        const path = UnitConst.unit(unit.id!);
        const response = await this.put(path, unit);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        if (!success) return null;
        const data = response.data['data']['unit'];
        return data;
    }

    /**
     * Update Unit info
     */
    public async updateUnitCustomer(id: number, customerId: number): Promise<Unit | null> {
        const path = UnitConst.customer(id);
        const response = await this.put(path, { customer_id: customerId });
        const success = response.success;
        if (!success) return null;
        const data = response.data['data']['unit'];
        return data;
    }

    /**
     * Update Unit Status
     */
    public async updateUnitStatus(id: number): Promise<Unit | null> {
        const path = UnitConst.status(id);
        const response = await this.put(path);
        const success = response.success;
        if (!success) return null;
        const data = response.data['data']['unit'];
        return data;
    }
}

export default UnitRepository;