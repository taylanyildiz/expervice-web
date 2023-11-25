import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import UnitConst from "./end-points/unit";
import { setAvailableTechnicians, setUnit, setUnitJobs, setUnitLayz, setUnits } from "@Store/unit_store";
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
     * Get Jobless Units of company
     */
    public async getJoblessUnits(): Promise<{ rows: Unit[], count: number } | null> {
        const response = await this.get("/", { params: { has_job: false, order_type: 'group_id', order_direction: 'ASC' } });
        const data = response.data['data']['units'];
        return data;
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

    /**
     * Get Available Technicians
     */
    public async getAvailableTechnicians(id: number, jobSubType: number): Promise<boolean> {
        const path = UnitConst.technicians(id);
        const response = await this.get(path, { params: { job_type_id: jobSubType } });
        const success = response.success;
        if (success) {
            const data = response.data['data']['technicians'];
            store.dispatch(setAvailableTechnicians(data));
        }
        return success;
    }

    /**
     * Get Unit Jobs
     */
    public async jobs(): Promise<void> {
        const { unitId, jobsFilter } = store.getState().unit;
        if (!unitId) return;
        const path = UnitConst.jobs(unitId)
        const response = await this.get(path, { params: jobsFilter });
        const success = response.success;
        SnackCustomBar.status(response, { display: !success })
        if (!success) return;
        const data = response.data['data']['jobs'];
        store.dispatch(setUnitJobs(data));
    }

    /**
     * Assign Units to customer
     */
    public async assign(units: number[], customer: number): Promise<boolean> {
        const path = UnitConst.assign;
        const response = await this.post(path, { units, customer_id: customer });
        SnackCustomBar.status(response);
        return response.success;
    }

    /**
     * Delete units
     */
    public async deleteUnits(units: number[]): Promise<boolean> {
        const path = "/";
        const response = await this.delete(path, { data: { units } });
        SnackCustomBar.status(response);
        return response.success;
    }

    /**
     * Delete unit
     */
    public async deleteUnit(id: number): Promise<boolean> {
        const path = UnitConst.unit(id);
        const response = await this.delete(path);
        SnackCustomBar.status(response);
        return response.success;
    }
}

export default UnitRepository;