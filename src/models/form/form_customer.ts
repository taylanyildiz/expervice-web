import Customer from "@Models/customer/customer";
import JobStatus from "@Models/job/job_status";
import JobSubType from "@Models/job/job_sub_type";
import UnitSubType from "@Models/units/unit_sub_type";
import Form from "./form";

interface FormCustomer {
    id?: number;
    customer_id?: number;
    form_id?: number;
    job_sub_type_id?: number;
    unit_sub_type_id?: number;
    current_job_status_id?: number;
    next_job_status_id?: number;
    name?: string;
    current_job_status?: JobStatus;
    next_job_status?: JobStatus;
    job_sub_type?: JobSubType;
    unit_sub_type?: UnitSubType;
    customer_user?: Customer;
    form?: Form;
}

export default FormCustomer;