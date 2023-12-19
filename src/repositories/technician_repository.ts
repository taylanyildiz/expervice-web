import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Technician from "./end-points/technician";
import { setTechnicianJobRoles, setTechnicianJobStatuses, setTechnicianJobs, setTechnicianLayz, setTechnicians } from "@Store/technician_store";
import TechnicianUser from "@Models/technician-user/technician_user";
import TechnicianProcess from "@Features/summary/users/technician-users/entities/technician_process";
import SnackCustomBar from "@Utils/snack_custom_bar";
import TechnicianUpdate from "@Features/summary/users/technician-users/entities/technician_update";
import TechnicianGroupUpdate from "@Features/summary/users/technician-users/entities/technician_group_update";

class TechnicianRepository extends BaseRepository {
    constructor() {
        super({ tag: Technician.technicians });
    }

    /**
     * Get Technicians of company
     */
    public async getTechnicians(): Promise<boolean> {
        store.dispatch(setTechnicianLayz(true));
        const filter = { ...store.getState().technician.filter };
        delete filter.page;
        const response = await this.get("/", { params: filter });
        store.dispatch(setTechnicianLayz(false));
        if (response.success) {
            const data = response.data['data']['technicians'];
            store.dispatch(setTechnicians(data));
        }
        return response.success;
    }

    /**
     * Create Technician
     */
    public async createTechnician(user: TechnicianProcess): Promise<TechnicianUser | null> {
        const response = await this.post("/", user);
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['technician']
        return data;
    }

    /**
     * Update Technician
     */
    public async updateTechnician(user: TechnicianUpdate): Promise<TechnicianUser | null> {
        const { technician } = store.getState().technician;
        const id = technician?.id;
        if (!id) return null;
        const path = Technician.technician(id);
        const response = await this.put(path, user);
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['technician']
        return data;
    }

    /**
     * Update Technician Group
     */
    public async updateTechnicianGroup(group: TechnicianGroupUpdate): Promise<TechnicianUser | null> {
        const { technician } = store.getState().technician;
        const id = technician?.id;
        if (!id) return null;
        const path = Technician.group(id);
        const response = await this.put(path, group);
        if (!response.success) return null;
        const data = response.data['data']['technician']
        return data;
    }

    /**
     * Update Technician Status
     */
    public async updateTechnicianStatus(status: boolean): Promise<TechnicianUser | null> {
        const { technician } = store.getState().technician;
        const id = technician?.id;
        if (!id) return null;
        const path = Technician.status(id);
        const response = await this.put(path, { is_active: status });
        if (!response.success) return null;
        const data = response.data['data']['technician']
        return data;
    }

    /**
     * Send invite technician
     */
    public async sendInvite(): Promise<TechnicianUser | null> {
        const { technician } = store.getState().technician;
        const id = technician?.id;
        if (!id) return null;
        const path = Technician.invite(id);
        const response = await this.post(path);
        if (!response.success) return null;
        const data = response.data['data']['technician']
        return data;
    }

    /**
     * Delete technician user
     */
    public async deleteTechnician(): Promise<boolean> {
        const { technician } = store.getState().technician;
        const id = technician?.id;
        if (!id) return false;
        const path = Technician.technician(id);
        const response = await this.delete(path);
        SnackCustomBar.status(response);
        return response.success;
    }

    /**
     * Get Technician jobs
     */
    public async getTechnicianJobs(id: number): Promise<boolean> {
        const path = Technician.jobs(id);
        const filter = store.getState().technician.technicianJobsFilter;
        store.dispatch(setTechnicianJobs({ rows: [], count: 0 }));
        const response = await this.get(path, { params: filter });
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        if (success) {
            const data = response.data?.['data']?.['job_technicians'];
            store.dispatch(setTechnicianJobs(data));
        }
        return success;
    }

    /**
     * Get Technician job roles
     */
    public async getTechnicianJobRoles(id: number): Promise<boolean> {
        store.dispatch(setTechnicianJobRoles(null));
        const path = Technician.jobRoles(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        if (success) {
            const data = response.data?.['data']?.['job_roles'];
            store.dispatch(setTechnicianJobRoles(data));
        }
        return success;
    }

    /**
     * Get Technician job statuses
     */
    public async getTechnicianJobStatuses(id: number): Promise<boolean> {
        store.dispatch(setTechnicianJobStatuses(null));
        const path = Technician.jobStatuses(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        if (success) {
            const data = response.data?.['data']?.['job_statuses'];
            store.dispatch(setTechnicianJobStatuses(data));
        }
        return success;
    }
}

export default TechnicianRepository;