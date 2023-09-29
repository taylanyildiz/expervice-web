import { Box } from "@mui/material";
import SuccessBox from "@Components/SuccessBox";

function RegisterSuccess() {
  return (
    <Box sx={{ boxShadow: 10, borderRadius: 4, px: 10, py: 10 }}>
      <SuccessBox message="Your account has been created successfully, you can complete your activation with the e-mail we sent to your e-mail address." />
    </Box>
  );
}

export default RegisterSuccess;
