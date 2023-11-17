import LoadingComp from "@Components/LoadingComp";
import PrimaryButton from "@Components/PrimaryButton";
import TabBar from "@Components/TabBar";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import UserRepository from "@Repo/user_repository";
import { Box, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import CompanyInfoBox from "./components/CompanyInfoBox";
import CompanyOverview from "./dialogs/CompanyOverview";
import { useFormik } from "formik";
import CompanyInfo from "@Models/company/company_info";
import CompanyBilling from "./dialogs/CompanyBilling";
import VisibilityComp from "@Components/VisibilityComp";
import SubscriptionInfoBox from "./components/SubscriptionInfoBox";

function CompanyDialog() {
  /// User repository
  const userRepo = new UserRepository();

  /// Tab index
  const [tabIndex, setTabIndex] = useState<string>("0");

  /// User store
  const { company } = useSelector((state: RootState) => state.user);

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

  /// Submit handle
  const onSubmitHandle = async () => {};

  /// Formik
  const initialValues: CompanyInfo = {};
  const formik = useFormik({ initialValues, onSubmit: onSubmitHandle });

  return (
    <>
      <DialogCustomTitle title="Company" />
      <DialogContent>
        <LoadingComp height={200} loading={loading}>
          <VisibilityComp
            visibility={tabIndex === "0"}
            children={<CompanyInfoBox />}
          />
          <VisibilityComp
            visibility={tabIndex === "1"}
            children={<SubscriptionInfoBox />}
          />
          <Box mt={1}>
            <TabBar
              onChanged={setTabIndex}
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
          />,
        ]}
      />
    </>
  );
}

export default CompanyDialog;
