interface JobProcess {
    unit_id?: number;
    sub_type_id?: number;
    priority_id?: number;
    description?: string;
    technicians?: (number | null | undefined)[];
}

export default JobProcess;