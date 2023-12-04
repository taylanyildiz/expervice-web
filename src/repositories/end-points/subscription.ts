const Subscription = {
    subscriptions: "/subscriptions",
    cancel: "/cancel",
    card: "card",
    order: `/order`,
    plan: (planId: number) => `/plan/${planId}`,
    cancelCancellation: "/cancel/cancellation",
}

export default Subscription;