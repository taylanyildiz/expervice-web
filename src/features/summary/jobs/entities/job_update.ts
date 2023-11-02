interface JobUpdate {
    id: number;
    priority_id?: number;
    technicians?: { technician_id?: number, role_id?: number }[]
}

export default JobUpdate