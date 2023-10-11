import SelectRegions from "@Components/SelectRegions";
import VisibilityComp from "@Components/VisibilityComp";
import PermissionResource from "@Models/permission/permission_resource";
import PermissionSubResource from "@Models/permission/permission_sub_resource";
import RolePermission from "@Models/permission/role_permission";
import { RootState } from "@Store/index";
import { expand } from "@Utils/functions";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface InternalUserPermissionProps {
  roleId: number;
}

function InternalUserPermission(props: InternalUserPermissionProps) {
  const { roleId } = props;

  /// Constat store
  const { permissions } = useSelector((state: RootState) => state.constant);

  /// Selecteds sub-resource [sub-permission]
  const [selecteds, setSelecteds] = useState<number[]>([]);

  /// Check default check
  const defaultCheckHandle = (rolePermissions: RolePermission[]): boolean => {
    const index = rolePermissions.findIndex((e) => e.role_id === roleId);
    return index !== -1 && (rolePermissions[index].is_selected ?? false);
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
    return (
      !selecteds.includes(id) && sub.id === 6 && !disabledCheckHandle(roles!)
    );
  };

  /// Initialize component
  useEffect(() => {}, []);

  /// Changed sub permission
  const onChangedSubHandle = (
    checked: boolean,
    subPermission: PermissionSubResource
  ) => {
    let values = [...selecteds];
    if (checked) {
      values.push(subPermission.id!);
    } else {
      values = [...selecteds.filter((e) => e !== subPermission.id)];
    }
    setSelecteds(values);
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
                      <Grid key={index} item xs={12}>
                        <FormControlLabel
                          value={selecteds.includes(e.id!)}
                          onChange={(_, v) => onChangedSubHandle(v, e)}
                          control={
                            <Checkbox
                              disabled={disabledCheckHandle(rolePermissions!)}
                              defaultChecked={defaultCheckHandle(
                                rolePermissions!
                              )}
                              size="small"
                            />
                          }
                          label={e.name}
                        />
                      </Grid>
                      <VisibilityComp visibility={checkRegionVisibility(e)}>
                        <Grid item xs={12}>
                          <SelectRegions
                            fullWidth
                            label="Regions"
                            onChanged={(values) => {}}
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
