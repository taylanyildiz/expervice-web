import PrimaryButton from "@Components/PrimaryButton";
import TranslateHelper from "@Local/index";
import Unit from "@Models/units/unit";
import { Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";

function UnitStatusButton(props: { formik: FormikProps<Unit> }) {
  const { formik } = props;

  /// Status state
  const [status, setStatus] = useState<boolean>(formik.values.status);

  /// Title & Desc state
  const [title, setTitle] = useState<string>(TranslateHelper.closeUnit());
  const [desc, setDesc] = useState<string | null>(null);

  /// Initialize component
  useEffect(() => {
    setStatus(formik.values.status);
    formik.setFieldValue("status_handle", formik.values.status);
    initTitles();
  }, [formik.values.status]);

  useEffect(() => {
    initTitles();
  }, [status]);

  const initTitles = () => {
    if (status === formik.values.status) {
      setDesc(null);
      if (status) return setTitle(TranslateHelper.closeUnit());
      return setTitle(TranslateHelper.openUnit());
    }
    setTitle(TranslateHelper.cancel());
    if (status && !formik.values.status) {
      return setDesc(TranslateHelper.unitWillOpenedOnSave());
    }
    setDesc(TranslateHelper.unitWillClosedOnSave());
  };

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
