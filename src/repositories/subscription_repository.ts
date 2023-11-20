import CompanySubscriptionOrder from "@Models/company/company_subscription_order";
import BaseRepository from "./base_repository";
import Subscription from "./end-points/subscription";
import SnackCustomBar from "@Utils/snack_custom_bar";

class SubscriptionRepository extends BaseRepository {
    constructor() {
        super({
            tag: Subscription.subscriptions
        })
    }

    public async cancelSubscription(reasonId: number, description: string): Promise<boolean> {
        const path = Subscription.cancel;
        const response = await this.post(path, { reason_id: reasonId, description });
        const success = response.success;
        return success;
    }

    public async updateCard(): Promise<any> {
        const path = Subscription.card;
        const response = await this.put(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success })
        return response.data?.['data'];
    }

    public async getSubsOrder(id: number): Promise<CompanySubscriptionOrder | null> {
        const path = Subscription.order(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        if (!success) return null;
        return response.data?.['data']['subscription'];
    }

    public async upgradePlan(id: number, planId: number): Promise<boolean> {
        const path = Subscription.plan(id, planId);
        const response = await this.put(path);
        const success = response.success;
        SnackCustomBar.status(response);
        return success;
    }
}


export default SubscriptionRepository;