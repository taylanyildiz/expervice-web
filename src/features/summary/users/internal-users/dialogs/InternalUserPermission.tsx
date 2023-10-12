import SelectRegions from "@Components/SelectRegions";
import VisibilityComp from "@Components/VisibilityComp";
import InternalUser from "@Models/internal-user/internal_user";
import PermissionSubResource from "@Models/permission/permission_sub_resource";
import RolePermission from "@Models/permission/role_permission";
import { RootState } from "@Store/index";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface InternalUserPermissionProps {
  formik: FormikProps<InternalUser>;
}

function InternalUserPermission(props: InternalUserPermissionProps) {
  const { formik } = props;
  const [roleId, setRoleId] = useState(formik.values.role_id);

  /// Constat store
  const { permissions } = useSelector((state: RootState) => state.constant);

  /// Selecteds sub-resource [sub-permission]
  const selecteds = formik.values.permission_sub_resources ?? [];

  useEffect(() => {
    if (roleId === formik.values.role_id) return;
    setRoleId(formik.values.role_id);
    formik.setFieldValue("permission_sub_resources", null);
    formik.setFieldValue("regions", null);
  }, [formik.values.role_id]);

  useEffect(() => {
    const selecteds = formik.values.permission_sub_resources;
    if (!selecteds) return;
    if (selecteds.some((e) => e.id === 6)) {
      formik.setFieldValue("regions", null);
    }
  }, [formik.values.permission_sub_resources]);

  /// Is selected
  const isSelected = (sub: PermissionSubResource) =>
    selecteds.map((e) => e.id!).includes(sub.id!);

  /// Check default check
  const defaultCheckHandle = (sub: PermissionSubResource): boolean => {
    const rolePermissions = sub.role_permissions!;
    const index = rolePermissions.findIndex((e) => e.role_id === roleId);
    const value = index !== -1 && (rolePermissions[index].is_selected ?? false);
    return value || isSelected(sub);
  };

  /// Check disabled
  const disabledCheckHandle = (rolePermissions: RolePermission[]): boolean => {
    const index = rolePermissions.findIndex((e) => e.role_id === roleId);
    return index !== -1 && !(rolePermissions[index].can_changeable ?? true);
  };

  /// Check selected
  const checkRegionVisibility = (sub: PermissionSubResource): boolean => {
    const id = sub.id!;
    const roles = sub.role_permissions;
    return !isSelected(sub) && id === 6 && !disabledCheckHandle(roles!);
  };

  /// Changed sub permission
  const onChangedSubHandle = (
    checked: boolean,
    subPermission: PermissionSubResource
  ) => {
    let values = [...(formik.values.permission_sub_resources ?? [])];
    if (checked) {
      values.push(subPermission);
    } else {
      values = [...values.filter((e) => e.id !== subPermission.id)];
    }
    formik.setFieldValue("permission_sub_resources", values);
  };

  return (
    <Grid container>
      {permissions.map((permission) => {
        const subPermissions = permission.sub_resources;
        return (
          <>
            <Grid item xs={12} className="permission-header">
              <Typography
                variant="h1"
                fontSize={13}
                children={permission.name}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <Grid container px={2}>
                {subPermissions?.map((e, index) => {
                  const rolePermissions = e.role_permissions;
                  return (
                    <>
                      <Grid key={e.id} item xs={12}>
                        <FormControlLabel
                          checked={defaultCheckHandle(e)}
                          onChange={(_, v) => onChangedSubHandle(v, e)}
                          control={
                            <Checkbox
                              disabled={disabledCheckHandle(rolePermissions!)}
                              size="small"
                            />
                          }
                          label={e.name}
                        />
                      </Grid>
                      <VisibilityComp visibility={checkRegionVisibility(e)}>
                        <Grid item xs={12}>
                          <SelectRegions
                            key={index}
                            fullWidth
                            label="Regions"
                            values={formik.values.regions}
                            helperText={
                              formik.touched.regions && formik.errors.regions
                            }
                            error={Boolean(
                              formik.touched.regions && formik.errors.regions
                            )}
                            onChanged={(values) => {
                              formik.setFieldValue("regions", values);
                            }}
                          />
                        </Grid>
                      </VisibilityComp>
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}

export default InternalUserPermission;
