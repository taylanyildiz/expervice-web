import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Production from "./end-points/production";
import { setProduct } from "@Store/production_store";

class ProductionRepository extends BaseRepository {

    /**
     * Get Production
     */
    public async getProduction(): Promise<void> {
        const { production } = store.getState().production;
        if (production) return;
        const path = Production.product;
        const response = await this.get(path);
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['product'];
        store.dispatch(setProduct(data));
    }

}

export default ProductionRepository;