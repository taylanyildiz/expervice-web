import LoadingComp from "@Components/LoadingComp";
import PrimaryButton from "@Components/PrimaryButton";
import TabBar from "@Components/TabBar";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import UserRepository from "@Repo/user_repository";
import { Box, DialogContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import CompanyInfoBox from "./components/CompanyInfoBox";
import CompanyOverview from "./dialogs/CompanyOverview";
import { useFormik } from "formik";
import CompanyInfo from "@Models/company/company_info";
import CompanyBilling from "./dialogs/CompanyBilling";
import { useCompanyUpdate } from "./helper/company_helper";
import { useDialog } from "@Utils/hooks/dialog_hook";
import VisibilityComp from "@Components/VisibilityComp";
import Colors from "@Themes/colors";
import CompanyRepository from "@Repo/company_repository";
import { object, string } from "yup";
import { urlRegex } from "@Utils/functions";

function CompanyDialog() {
  /// User repository
  const userRepo = new UserRepository();

  /// Company repository
  const companyRepo = new CompanyRepository();

  /// User store
  const { company } = useSelector((state: RootState) => state.user);

  /// Dailog hook
  const { openLoading, closeDialog } = useDialog();

  /// Loading state
  const [loading, setLoading] = useState<boolean>(true);

  /// Initialize component
  useEffect(() => {
    setLoading(true);
    userRepo.company().then((value) => {
      setLoading(!value);
    });
  }, []);

  /// Listen company
  useEffect(() => {
    if (!company) return;
    for (let [k, v] of Object.entries(company)) {
      formik.setFieldValue(k, v);
    }
  }, [company]);

  /// Save handle
  const handleSave = () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    const result = await openLoading(async () => {
      let result = false;
      if (info) {
        result = await companyRepo.updateInfo(info);
      }
      if (address) {
        result = await companyRepo.updateAddress(address);
      }
      return result;
    });
    if (!result) return;
    closeDialog();
  };

  /// Formik
  const initialValues: CompanyInfo = {};
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      name: string().required().min(2, "Invalid name"),
      web_site: string().matches(urlRegex, "Invalid web site"),
      phone_number: string().min(2, "Invalid phone"),
      fax_number: string().min(2, "Invalid fax"),
      company_address: object({
        country: object().nullable().required(),
        state: object().required(),
        city: object().required(),
        street_address: string().required().min(2, "Invalid address"),
        zip_code: string().required().min(2, "Invalid zip"),
      }),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Company process
  const { address, anyUpdate, info } = useCompanyUpdate(formik);

  return (
    <>
      <DialogCustomTitle title="Company" />
      <VisibilityComp visibility={anyUpdate}>
        <Box pl={1} m={0} sx={{ backgroundColor: Colors.warning }}>
          <Typography
            fontSize={13}
            color="white"
            children="Please click save to save changes"
          />
        </Box>
      </VisibilityComp>
      <DialogContent>
        <LoadingComp height={200} loading={loading}>
          <CompanyInfoBox />
          <Box mt={1}>
            <TabBar
              tabs={[
                {
                  title: "Overview",
                  panel: <CompanyOverview formik={formik} />,
                },
                {
                  title: "Billing",
                  panel: <CompanyBilling />,
                },
              ]}
            />
          </Box>
        </LoadingComp>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            fontWeight="normal"
            color="white"
            variant="contained"
            children="Save"
            onClick={handleSave}
          />,
        ]}
      />
    </>
  );
}

export default CompanyDialog;