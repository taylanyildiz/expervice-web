import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import { Grid } from "@mui/material";

interface RegisterActionProps {
  active: number;
  onBack: () => void;
  onNext: () => void;
}

function RegisterActions(props: RegisterActionProps) {
  const { active, onBack, onNext } = props;
  return (
    <Grid container mt={10}>
      <Grid container>
        <Grid item xs={6} justifyContent="start" display="flex">
          {active !== 0 && (
            <PrimaryButton
              prefix={<ArrowBackIosIcon />}
              onClick={onBack}
              children="Back"
              variant="outlined"
              color="black"
              backgroundColor="white"
              fontWeight="normal"
              border="1px solid grey"
              fontSize={14}
            />
          )}
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
          <PrimaryButton
            onClick={onNext}
            children="Continue"
            backgroundColor={Colors.primaryLight}
            color="white"
            fontWeight="normal"
            fontSize={14}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterActions;
