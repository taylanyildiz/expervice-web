import BaseRepository from "./base_repository";
import Subscription from "./end-points/subscription";

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
        if (success) {
            // TODO: Logout
        }
        return success;
    }

    public async updateCard(): Promise<boolean> {
        const path = Subscription.card;
        const response = await this.put(path);
        const success = response.success;
        if (success) {
            // TODO: Logout
        }
        return success;
    }
}


export default SubscriptionRepository;