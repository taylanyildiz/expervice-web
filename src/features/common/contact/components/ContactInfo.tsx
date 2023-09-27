import { Grid, Link, Typography } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import Colors from "@Themes/colors";


function ContactInfo() {
    return (
        <Grid container direction="column" rowSpacing={3}>
            <Grid item children={<Typography variant="h3" fontSize={27} fontWeight="bold" children="Contact our Customer Success team" />} />
            <Grid item children={<Typography fontWeight={100} fontSize={17} children="Have questions or need help with your account? We’re here for you!" />} />
            <Grid item children={<Typography fontWeight={100} fontSize={17} children="Monday – Friday | 7:00am – 5:00pm | USA (CT)" />} />
            <Grid item>
                <Grid container columnSpacing={2} justifyContent="start" alignItems="start">
                    <Grid item children={<LocalPhoneIcon sx={{
                        color: Colors.primaryDark
                    }} />} />
                    <Grid item>
                        <Link href="">
                            <Typography fontSize={17} color={Colors.secodaryDark} children="90 506 169 00 03" />
                        </Link>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item>
                <Grid container columnSpacing={2} justifyContent="start" alignItems="start">
                    <Grid item children={<EmailIcon sx={{
                        color: Colors.primaryDark
                    }} />} />
                    <Grid item>
                        <Link href="">
                            <Typography fontSize={17} color={Colors.secodaryDark} children="taylanyildz@outlook.com" />
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ContactInfo;