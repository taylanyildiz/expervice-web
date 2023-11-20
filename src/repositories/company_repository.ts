import CompanyInfoProcess from "@Features/summary/company/entities/company_info_process";
import BaseRepository from "./base_repository";
import SnackCustomBar from "@Utils/snack_custom_bar";
import CompanyAddressProcess from "@Features/summary/company/entities/company_address_process";

class CompanyRepository extends BaseRepository {
    constructor() {
        super({
            tag: "/companies",
        })
    }


    public async updateInfo(data: CompanyInfoProcess): Promise<boolean> {
        const path = "/info";
        const response = await this.put(path, data);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        return success;
    }


    public async updateAddress(data: CompanyAddressProcess): Promise<boolean> {
        const path = "/address";
        const response = await this.put(path, data);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        return success;
    }


}

export default CompanyRepository;