import { Grid } from "@mui/material";
import ContactBox from "./components/ContactBox";
import ContactInfo from "./components/ContactInfo";
import ContactFormBox from "./components/ContactFormBox";

function ContactPage() {
  return (
    <>
      <Grid container rowSpacing={10}>
        <Grid item xs={12} children={<ContactBox />} />
        <Grid item xs={12} px={20}>
          <Grid container>
            <Grid item xs={7} children={<ContactInfo />} />
            <Grid item xs={5} children={<ContactFormBox />} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ContactPage;
