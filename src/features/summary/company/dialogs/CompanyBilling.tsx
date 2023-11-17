import LoadingComp from "@Components/LoadingComp";
import UserRepository from "@Repo/user_repository";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

function CompanyBilling() {
  /// User repository
  const userRepo = new UserRepository();

  /// Loading state
  const [loading, setLoading] = useState<boolean>(true);

  /// Initialize component
  useEffect(() => {
    userRepo.subscribtion().then((value) => {
      setLoading(!value);
    });
  }, []);

  return (
    <LoadingComp loading={loading} height={400}>
      <Stack direction="column"></Stack>
    </LoadingComp>
  );
}

export default CompanyBilling;
