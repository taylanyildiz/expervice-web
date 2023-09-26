import { store } from "@Utils/hooks";
import BaseRepository from "./base_repository";
import { setLanguages } from "@Utils/hooks/constant_hooks";
import Constants from "./end-points/constants";

class ConstantRepository extends BaseRepository {
    constructor() {
        super({ tag: "/constants" });
    }

    /**
     * Get Languages
     */
    public async getLanguages(): Promise<void> {
        const languages = store.getState().constants.languages;
        if (languages?.length) return; // Already exist
        const path = Constants.languages;
        const response = await this.get(path);
        const statusCode = response.status;
        if (statusCode !== 200) return;
        const data = response.data['data']['languages'];
        store.dispatch(setLanguages(data));
    }

}

export default ConstantRepository;