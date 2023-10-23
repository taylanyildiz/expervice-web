import PrimaryButton from "@Components/PrimaryButton";
import Unit from "@Models/units/unit";
import Colors from "@Themes/colors";
import { Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";

function UnitStatusButton(props: { formik: FormikProps<Unit> }) {
  const { formik } = props;

  /// Status state
  const [status, setStatus] = useState<boolean>(formik.values.status);

  /// Title & Desc state
  const [title, setTitle] = useState<string>("Close Unit");
  const [desc, setDesc] = useState<string | null>(null);

  /// Initialize component
  useEffect(() => {
    setStatus(formik.values.status);
  }, [formik.values.status]);

  useEffect(() => {
    if (status === formik.values.status) {
      setDesc(null);
      if (status) return setTitle("Close Unit");
      return setTitle("Open Unit");
    }
    setTitle("Cancel");
    if (status && !formik.values.status) {
      return setDesc("Unit will opened on save");
    }
    setDesc("Unit will closed on save");
  }, [status]);

  /// Click handle
  const onClickHandle = () => {
    formik.setFieldValue("status_handle", !status);
    setStatus((pre) => !pre);
  };

  return (
    <Grid container columnSpacing={1} alignItems="center">
      <Grid item>
        <PrimaryButton
          fontWeight="normal"
          fontSize={12}
          height={30}
          padding="0px 5px 0px 5px"
          backgroundColor="transparent"
          variant="outlined"
          children={title}
          onClick={onClickHandle}
        />
      </Grid>
      <Grid item>
        <Typography variant="body1" fontSize={13} children={desc} />
      </Grid>
    </Grid>
  );
}

export default UnitStatusButton;
