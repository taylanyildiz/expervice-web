import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Constant from "./end-points/constant";
import { setLanguages } from "@Store/constant_store";

class ConstantRepository extends BaseRepository {
    constructor() {
        super({ tag: "/constants" });
    }

    /**
     * Get Languages
     */
    public async getLanguages(): Promise<void> {
        const languages = store.getState().constant.languages;
        if (languages?.length) return; // Already exist
        const path = Constant.languages;
        const response = await this.get(path);
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['languages'];
        store.dispatch(setLanguages(data));
    }

}

export default ConstantRepository;