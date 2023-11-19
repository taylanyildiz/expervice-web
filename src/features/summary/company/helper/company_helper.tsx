import { useDialog } from "@Utils/hooks/dialog_hook";
import CompanyDialog from "..";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import SubscriptionPlanDialog from "../dialogs/SubscriptionPlanDialog";
import CancelSubscriptionDialog from "../dialogs/CancelSubscriptionDialog";
import { FormikProps } from "formik";
import CompanyInfo from "@Models/company/company_info";
import { useEffect, useState } from "react";
import CompanyInfoProcess from "../entities/company_info_process";
import { equalInterface } from "@Utils/functions";
import CompanyAddressProcess from "../entities/company_address_process";

/// User store
export function useUser() {
  return useSelector((state: RootState) => state.user);
}

/**
 * Company dialog hook
 */
export function useCompanyDialog() {
  const { openDialog } = useDialog();
  return {
    openCompanyDialog: () => openDialog(<CompanyDialog />, "md"),
    openSubscriptionDialog: () => openDialog(<SubscriptionPlanDialog />, "sm"),
    openCancelSubscriptionDialog: () => {
      openDialog(<CancelSubscriptionDialog />, "xs");
    },
  };
}

/**
 * Company Update Hook
 */
export function useCompanyUpdate(formik: FormikProps<CompanyInfo>) {
  const { company } = useUser();
  const value = formik.values;

  const [anyUpdate, setAnyUpdate] = useState(false);
  const [info, setInfo] = useState<CompanyInfoProcess | null>(null);
  const [address, setAddress] = useState<CompanyAddressProcess | null>(null);

  useEffect(() => {
    setAddress(null);
    setInfo(null);
    setAnyUpdate(false);

    const checkInfo = () => {
      const oldCompany: CompanyInfoProcess = {
        company_name: company?.name,
        fax_number: company?.fax_number,
        phone_number: company?.phone_number,
        web_site: company?.web_site,
      };

      const newCompany: CompanyInfoProcess = {
        company_name: value?.name,
        fax_number: value?.fax_number,
        phone_number: value?.phone_number,
        web_site: value?.web_site,
      };

      const anyChanged = !equalInterface(oldCompany, newCompany);
      setAnyUpdate((pre) => pre || anyChanged);
      if (anyChanged) setInfo(newCompany);
    };

    const checkAddress = () => {
      const oldAddress: CompanyAddressProcess = {
        city_id: company?.company_address?.city?.id,
        country_id: company?.company_address?.country?.id,
        state_id: company?.company_address?.state?.id,
        zip_code: company?.company_address?.zip_code,
        street_address: company?.company_address?.street_address,
      };

      const newAddress: CompanyAddressProcess = {
        city_id: value?.company_address?.city?.id,
        country_id: value?.company_address?.country?.id,
        state_id: value?.company_address?.state?.id,
        zip_code: value?.company_address?.zip_code,
        street_address: value?.company_address?.street_address,
      };

      const anyChanged = !equalInterface(newAddress, oldAddress);
      setAnyUpdate((pre) => pre || anyChanged);
      if (anyChanged) setAddress(newAddress);
    };

    checkInfo();
    checkAddress();
  }, [value, company]);

  return {
    anyUpdate,
    info,
    address,
  };
}
