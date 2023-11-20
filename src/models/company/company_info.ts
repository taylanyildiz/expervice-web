import { Creator } from "..";
import CompanyAddress from "./company_address";
import CompanyImage from "./company_image";

interface CompanyInfo {
    id?: number;
    user_id?: number;
    name?: string;
    web_site?: string;
    phone_number?: string;
    fax_number?: string;
    company_user?: Creator;
    company_address?: CompanyAddress;
    company_image?: CompanyImage;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string
}

export default CompanyInfo;