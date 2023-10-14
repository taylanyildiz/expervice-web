const Customer = {
    customers: "/companies/customer-users",
    customer: (id: number) => `/${id}`,
    invite: (id: number) => `/${id}/invite`,
    status: (id: number) => `/${id}/status`,
    units: (id: number) => `/${id}/units`,
    group: (id: number) => `/${id}/group`,
}

export default Customer;