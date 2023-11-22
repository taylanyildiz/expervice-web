import CompanyInfoProcess from "@Features/summary/company/entities/company_info_process";
import BaseRepository from "./base_repository";
import SnackCustomBar from "@Utils/snack_custom_bar";
import CompanyAddressProcess from "@Features/summary/company/entities/company_address_process";
import { store } from "@Store/index";
import { setCompany } from "@Store/user_store";

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

    public async updateImage(image: FormData): Promise<boolean> {
        const path = "/image";
        const response = await this.put(path, image, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const success = response.success;
        SnackCustomBar.status(response);
        if (success) {
            const data = response.data['data']['image']
            const company = store.getState().user.company;
            store.dispatch(setCompany({
                ...company,
                company_image: data,
            }))
        }
        return success;
    }

    public async deleteImage(): Promise<boolean> {
        const path = "/image";
        const response = await this.delete(path);
        const success = response.success;
        SnackCustomBar.status(response);
        if (success) {
            const company = store.getState().user.company;
            store.dispatch(setCompany({
                ...company,
                company_image: null,
            }))
        }
        return success;
    }

}

export default CompanyRepository;