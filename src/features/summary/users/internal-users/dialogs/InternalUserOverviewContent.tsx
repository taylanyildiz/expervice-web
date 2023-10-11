import SelectUserRole from "@Components/SelectUserRole";
import TextOutlineField from "@Components/TextOutlineField";
import { Box, Grid, Typography } from "@mui/material";

function OverViewContent() {
  return (
    <div>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} children={<Header />} />
        <Grid item xs={12}>
          <Grid container columnSpacing={4}>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="firt_name"
                type="text"
                label="First Name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="last_name"
                type="text"
                label="Last Name"
              />
            </Grid>
            <Grid item xs={8}>
              <TextOutlineField
                fullWidth
                name="email"
                type="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={8}>
              <TextOutlineField
                fullWidth
                name="phone"
                type="tel"
                label="Phone"
              />
            </Grid>
            <Grid item xs={5}>
              <SelectUserRole
                fullWidth
                label="Role"
                roleType={3}
                onChanged={(value) => {}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function Header() {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid container mb={1}>
        <Grid item flexGrow={1}>
          <Typography variant="h1" fontSize={15} children="Overview" />
        </Grid>
        <Grid item>{/* Activation Status & Button */}</Grid>
      </Grid>
    </Box>
  );
}

export default OverViewContent;
