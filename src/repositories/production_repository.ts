import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Production from "./end-points/production";
import { setProduct } from "@Store/production_store";

class ProductionRepository extends BaseRepository {

    /**
     * Get Production
     */
    public async getProduction(): Promise<boolean> {
        const path = Production.product;
        const response = await this.get(path);
        const success = response.success;
        if (success) {
            const data = response.data['data']['product'];
            store.dispatch(setProduct(data));
        }
        return success;
    }

}

export default ProductionRepository;