interface CompanySubscriptionOrder {
    referenceCode?: string;
    parentReferenceCode?: string;
    pricingPlanName?: string;
    pricingPlanReferenceCode?: string;
    productName?: string;
    productReferenceCode?: string;
    customerEmail?: string;
    customerGsmNumber?: string;
    customerReferenceCode?: string;
    subscriptionStatus?: string;
    trialDays?: number;
    trialStartDate?: number;
    trialEndDate?: number;
    createdDate?: number;
    startDate?: number;
    orders?: Order[];
}

export interface Order {
    referenceCode?: string;
    price?: number;
    currencyCode?: string;
    startPeriod?: number;
    endPeriod?: number;
    orderStatus?: string;
    paymentAttempts?: PaymentAttempt[];
}

export interface PaymentAttempt {
    conversationId?: string;
    createdDate?: number;
    paymentId?: number;
    paymentStatus?: string;
}

export default CompanySubscriptionOrder;