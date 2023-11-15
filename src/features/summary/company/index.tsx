import LoadingComp from "@Components/LoadingComp";
import PrimaryButton from "@Components/PrimaryButton";
import TabBar from "@Components/TabBar";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import UserRepository from "@Repo/user_repository";
import { Box, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useProfile } from "../profile/helper/profile_helper";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import CompanyInfo from "./components/CompanyInfo";
import CompanyOverview from "./dialogs/CompanyOverview";

function CompanyDialog() {
  /// User repository
  const userRepo = new UserRepository();

  /// Profile store
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

  return (
    <>
      <DialogCustomTitle title="Company" />
      <DialogContent>
        <LoadingComp height={200} loading={loading}>
          <CompanyInfo />
          <Box mt={1}>
            <TabBar
              tabs={[
                {
                  title: "Overview",
                  panel: <CompanyOverview />,
                },
                {
                  title: "Billing",
                  panel: <p></p>,
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
