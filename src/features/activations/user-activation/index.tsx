import Images from "@Assets/images";
import PrimaryButton from "@Components/PrimaryButton";
import SuccessBox from "@Components/SuccessBox";
import { PhoneMask } from "@Components/TextInputMask";
import TextOutlineField from "@Components/TextOutlineField";
import VisibilityComp from "@Components/VisibilityComp";
import UserRepository from "@Repo/user_repository";
import ERouter from "@Routes/router_enum";
import { phoneMaskParse, useQuery } from "@Utils/functions";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { object, string } from "yup";

enum UserType {
  internal = "1",
  technician = "2",
  customer = "3",
}

interface UserActivation {
  type?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone_code?: string | null;
  phone_number?: string | null;
  phone?: string | null;
  code?: string | null;
  password?: string | null;
}

type Activation = Omit<UserActivation, "phone">;

function UserActivation() {
  /// Url query
  const [query] = useQuery();
  const email = query.get("email");
  const code = query.get("code");
  const type = query.get("type");

  const isTechnicianActivation = type === UserType.technician;

  /// Completed state
  const [completed, setCompleted] = useState<boolean>(false);

  /// Dialog hook
  const { openLoading } = useDialog();

  /// User repository
  const userRepo = new UserRepository();

  if (!email || !code || !type) return <Navigate to={ERouter.Base} />;

  const submitHandle = async (value: UserActivation) => {
    const { code: phoneCode, number } = phoneMaskParse(value.phone!)!;

    const activation: Activation = {
      type: type,
      code: code,
      first_name: value.first_name,
      last_name: value.last_name,
      password: value.password,
      phone_code: phoneCode,
      phone_number: number,
    };
    const result = await openLoading(async () => {
      return await userRepo.activation(activation);
    });
    setCompleted(result);
  };

  const initialValues: UserActivation = {
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      first_name: string().when(["type"], {
        is: (type?: string | null) => {
          return type === UserType.technician;
        },
        then: () => string().nullable().notRequired(),
        otherwise: () =>
          string()
            .nullable()
            .required("first name required")
            .min(2, "invalid name"),
      }),
      last_name: string().when(["type"], {
        is: (type?: string | null) => {
          return type === UserType.technician;
        },
        then: () => string().nullable().notRequired(),
        otherwise: () =>
          string()
            .nullable()
            .required("last name required")
            .min(2, "invalid name"),
      }),
      password: string()
        .nullable()
        .required("password required")
        .min(6, "invalid password"),
      phone: string()
        .required("phone required")
        .test("valid", "invalid Phone", function (val: any) {
          const pattern = /\+|\_|\ |\(|\)/g;
          const length = val?.replace(pattern, "").length;
          return length === 12;
        }),
    }),
    onSubmit: submitHandle,
  });

  return (
    <Box className="login-page">
      <VisibilityComp visibility={!completed}>
        <Stack justifyContent="center" textAlign="center">
          <Link
            to={ERouter.Login}
            children={Images.logoTextWithWhite({ height: 100 })}
          />
          <Box
            borderRadius={1}
            p={1}
            py={4}
            m={1}
            maxWidth={500}
            minWidth={300}
            sx={{ backgroundColor: "white" }}
          >
            <Grid container>
              <VisibilityComp visibility={!isTechnicianActivation}>
                <Grid item xs={12}>
                  <Grid container columnSpacing={1}>
                    <Grid item xs={6}>
                      <TextOutlineField
                        fullWidth
                        name="first_name"
                        label="First Name"
                        value={formik.values.first_name}
                        helperText={
                          formik.touched.first_name && formik.errors.first_name
                        }
                        error={Boolean(
                          formik.errors.first_name && formik.touched.first_name
                        )}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextOutlineField
                        fullWidth
                        name="last_name"
                        label="Last Name"
                        value={formik.values.last_name}
                        helperText={
                          formik.touched.last_name && formik.errors.last_name
                        }
                        error={Boolean(
                          formik.errors.last_name && formik.touched.last_name
                        )}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </VisibilityComp>
              <Grid item xs={12}>
                <TextOutlineField
                  fullWidth
                  type="tel"
                  name="phone"
                  label="Phone Number"
                  value={formik.values.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                  error={Boolean(formik.errors.phone && formik.touched.phone)}
                  onChange={formik.handleChange}
                  inputComponent={PhoneMask}
                />
              </Grid>
              <Grid item xs={12}>
                <TextOutlineField
                  fullWidth
                  secret
                  type="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  helperText={formik.touched.password && formik.errors.password}
                  error={Boolean(
                    formik.errors.password && formik.touched.password
                  )}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} px={4}>
                <PrimaryButton
                  fullWidth
                  fontWeight="normal"
                  color="white"
                  children="Activate Account"
                  onClick={() => formik.handleSubmit()}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </VisibilityComp>
      <VisibilityComp visibility={completed}>
        <Stack>
          <SuccessBox color="white" />
          <Typography
            color="white"
            children="Your activation has been completed successfully"
          />
        </Stack>
      </VisibilityComp>
    </Box>
  );
}
export default UserActivation;
