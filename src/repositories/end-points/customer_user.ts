const Customer = {
    customers: "/companies/customer-users",
    customer: (id: number) => `/${id}`,
    invite: (id: number) => `/${id}/invite`,
    status: (id: number) => `/${id}/status`,
    units: (id: number) => `/${id}/units`,
    group: (id: number) => `/${id}/group`,
    forms: (id: number) => `/${id}/forms`,
    customerForm: (id: number, formId: number) => `/${id}/forms/${formId}`,
    form: (id: number) => `/forms/${id}`,
    formPdf: (id: number) => `/forms/${id}/pdf`,
}

export default Customer;