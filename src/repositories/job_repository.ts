import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import JobConsts from "./end-points/job";
import { setJob, setJobLayzLoading, setJobs } from "@Store/job_store";
import Job from "@Models/job/job";
import SnackCustomBar from "@Utils/snack_custom_bar";
import JobProcess from "@Features/summary/jobs/entities/job_process";
import JobUpdate from "@Features/summary/jobs/entities/job_update";
import { EJobStatuses } from "@Features/summary/jobs/entities/job_enums";
import { setUnit } from "@Store/unit_store";
import { isAvailableJobStatus } from "@Features/summary/jobs/helper/job_enum_helper";
import FormCustomerSign from "@Features/summary/form-customer-sign/entities/form_customer_sign";

class JobRepository extends BaseRepository {
    constructor() {
        super({ tag: JobConsts.jobs });
    }

    /**
     * Get Company Jobs
     */
    public async getJobs(): Promise<void> {
        const path = "/";
        const filter = store.getState().job.jobFilter;
        store.dispatch(setJobLayzLoading(true));
        const response = await this.get(path, { params: filter });
        store.dispatch(setJobLayzLoading(false));
        const success = response.success;
        if (!success) return;
        const data = response.data['data']['jobs'];
        store.dispatch(setJobs(data));
    }

    /**
     * Get Job
     */
    public async job(id: number): Promise<Job | null> {
        const path = JobConsts.job(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success })
        if (!success) return null;
        const data = response.data['data']['job'];
        store.dispatch(setJob(data));
        return data;
    }

    /**
     * Update Job
     */
    public async updateJob(job: JobUpdate): Promise<Job | null> {
        const path = JobConsts.job(job.id);
        const response = await this.put(path, job);
        const success = response.success;
        if (!success) return null;
        const data = response.data['data']['job'];
        return data;
    }

    /**
     * Delete Job Technician
     */
    public async deleteTechnician(jobId: number, technician: number): Promise<Job | null> {
        const path = JobConsts.technician(jobId, technician);
        const response = await this.delete(path);
        const success = response.success;
        if (!success) return null;
        const data = response.data['data']['job'];
        return data;
    }

    /**
     * Update Job Technician
     */
    public async updateTechnician(jobId: number, technician: number, roleId: number): Promise<Job | null> {
        const path = JobConsts.technicianRole(jobId, technician);
        const response = await this.put(path, { role_id: roleId });
        const success = response.success;
        if (!success) return null;
        const data = response.data['data']['job'];
        return data;
    }

    /**
     * Create Job
     */
    public async createJob(job: JobProcess): Promise<Job | null> {
        const { unit } = store.getState().unit
        const path = "/";
        const response = await this.post(path, job);
        const success = response.success;
        SnackCustomBar.status(response);
        if (!success) return null;
        const data = response.data['data']['job'];
        if (unit) {
            store.dispatch(setUnit({
                ...unit,
                job: data,
            }))
        }
        return data;
    }

    /**
     * Get Job Form as PDF:Base63
     */
    public async getJobFormPdf(id: number): Promise<string | null> {
        const path = JobConsts.jobPdf(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        if (!success) return null;
        const data = response.data['data']['pdf'];
        return data;
    }

    /**
     * Update form status
     * @param status 
     */
    public async updateFormStatus(id: number, status: number): Promise<boolean> {
        const path = JobConsts.formStatus(id);
        const response = await this.put(path, { status });
        const sucess = response.success;
        SnackCustomBar.status(response);
        return sucess;
    }

    /**
     * Sent form customer to sign
     */
    public async sendFormCustomerToSign(id: number): Promise<boolean> {
        const path = JobConsts.customerFormSignature(id);
        const response = await this.post(path);
        const sucess = response.success;
        SnackCustomBar.status(response);
        return sucess;
    }

    /**
     * Sent form to customer
     */
    public async sendFormCustomer(id: number): Promise<boolean> {
        const path = JobConsts.customerForm(id);
        const response = await this.post(path);
        const sucess = response.success;
        SnackCustomBar.status(response);
        return sucess;
    }

    /**
     * Delete Job
     */
    public async deleteJob(id: number): Promise<boolean> {
        const path = JobConsts.job(id);
        const response = await this.delete(path);
        SnackCustomBar.status(response);
        return response.success;
    }

    /**
     * Update job status
     */
    public async updateJobStatus(id: number, status: EJobStatuses): Promise<Job | null> {
        const path = JobConsts.jobStatus(id, status);
        const { unit } = store.getState().unit
        const response = await this.put(path);
        SnackCustomBar.status(response);
        const success = response.success;
        const data = response.data?.['data']?.['job'];
        if (success) {
            const available = isAvailableJobStatus(data.status_id);
            if (unit) {
                store.dispatch(setUnit({
                    ...unit,
                    job: available ? data : null,
                }))
            }
        }
        return data;
    }

    /**
     * Sign form as customer user
     * @param id 
     * @param data first_name | last_name | signature
     * @returns 
     */
    public async signFormAsCusomer(id: number, data: FormCustomerSign): Promise<boolean> {
        const path = JobConsts.signFormAsCustomer(id);
        data = { ...data, signature: data.signature?.replace(/^data:image\/png;base64,/, '') }
        const response = await this.put(path, data);
        SnackCustomBar.status(response);
        return response.success;
    }
}

export default JobRepository;