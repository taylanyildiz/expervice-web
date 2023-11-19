const Subscription = {
    subscriptions: "/subscriptions",
    cancel: "/cancel",
    card: "card",
    order: (id: number) => `/${id}/order`,
    plan: (id: number, planId: number) => `/${id}/plan/${planId}`
}

export default Subscription;