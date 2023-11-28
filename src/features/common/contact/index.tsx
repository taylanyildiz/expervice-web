import { Grid } from "@mui/material";
import ContactBox from "./components/ContactBox";
import ContactInfo from "./components/ContactInfo";
import ContactFormBox from "./components/ContactFormBox";

function ContactPage() {
  return (
    <>
      <Grid container rowSpacing={10}>
        <Grid item xs={12} children={<ContactBox />} />
        <Grid item xs={12} px={10}>
          <Grid container columnSpacing={10} rowSpacing={4}>
            <Grid item xs children={<ContactInfo />} />
            <Grid item xs children={<ContactFormBox />} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ContactPage;
