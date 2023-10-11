import { RootState } from "@Store/index";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import InternalUserPermission from "./InternalUserPermission";
import SelectUserRole from "@Components/SelectUserRole";

function InternalUserPermissionsContent() {
  /// Constant store
  const {} = useSelector((state: RootState) => state.constant);

  return (
    <Grid container>
      <Grid item xs={12} children={<Header />} />
      <Grid item xs={4} mt={2}>
        <SelectUserRole
          fullWidth
          label="Role"
          roleType={3}
          onChanged={(value) => {}}
        />
      </Grid>
      <Grid item xs={12} children={<InternalUserPermission roleId={5} />} />
    </Grid>
  );
}

function Header() {
  return (
    <Box>
      <Grid container>
        <Grid item flexGrow={1}>
          <Typography variant="h1" fontSize={15} children="Permissions" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InternalUserPermissionsContent;
