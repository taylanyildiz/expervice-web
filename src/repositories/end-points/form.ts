const Form = {
    forms: "/companies/forms",
    form: (id: number) => `/${id}`,
    pdf: (id: number) => `/${id}/pdf`,
    fields: (id: number) => `/${id}/fields`,
    field: (id: number, field: number) => `/${id}/fields/${field}`,
    fieldOrder: (id: number) => `/${id}/fields/order`,
    template: () => `/template`,
};

export default Form;