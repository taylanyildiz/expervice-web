import { useEffect } from "react";
import { useTechnician } from "../helper/technician_helper";
import TechnicianRepository from "@Repo/technician_repository";
import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import TranslateHelper from "@Local/index";
import StatusBox from "@Components/StatusBox";
import RichText from "@Components/RichText";
import { caption } from "@Utils/functions";
import { useUser } from "@Features/summary/company/helper/company_helper";
import { EJobRoles } from "@Features/summary/jobs/entities/job_enums";
import LoadingComp from "@Components/LoadingComp";

function TechnicianUserInfo() {
  /// Technician store
  const { technician, technicianJobRoles, technicianJobStatuses } =
    useTechnician();

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Job of continue - canceled - done
  const continueJob = technicianJobStatuses?.find((e) => e.continue_jobs);
  const doneJob = technicianJobStatuses?.find((e) => e.done_jobs);
  const canceledJob = technicianJobStatuses?.find((e) => e.cancel_jobs);

  /// Job of supervisor - concurrent - assigned
  const supervisorJob = technicianJobRoles?.find(
    (e) => e.role_id === EJobRoles.Supervisor
  );
  const asignedJob = technicianJobRoles?.find(
    (e) => e.role_id === EJobRoles.Asigned
  );
  const concurrentJob = technicianJobRoles?.find(
    (e) => e.role_id === EJobRoles.Concurrent
  );

  /// has Technician
  const hasTechnician = Boolean(technician);

  /// Loading roles
  const loadingRoles = Boolean(technicianJobRoles);

  /// Loading statuses
  const loadingStatuses = Boolean(technicianJobStatuses);

  /// Technician repository
  const technicianRepo = new TechnicianRepository();

  /// Initialize component
  useEffect(() => {
    if (!hasTechnician) return;
    technicianRepo.getTechnicianJobRoles(technician?.id!);
    technicianRepo.getTechnicianJobStatuses(technician?.id!);
  }, []);

  if (!hasTechnician) return <></>;

  const name = `${technician?.first_name} ${technician?.last_name}`;
  const email = technician?.email;
  const phone = technician?.phone;
  const group = technician?.technician_group;
  const groupName = group?.group?.name;
  const groupRole = group?.group_role;
  const groupRoleName = groupRole?.translations?.name?.[lng];
  const groupRoleDesc = groupRole?.translations?.description?.[lng];
  const status = technician?.status;

  return (
    <Box sx={{ mt: 2, backgroundColor: "white" }}>
      <Stack divider={<Divider />}>
        <Stack p={1} spacing={1} direction="row">
          <Typography
            variant="h1"
            fontSize={14}
            children={TranslateHelper.userInformation()}
          />
          <StatusBox email={email} status={status!} />
        </Stack>
        <Stack p={1} spacing={1} direction="row">
          <Avatar
            sx={{ width: 60, height: 60, color: "white" }}
            children={caption(name)}
          />
          <Stack>
            <RichText
              color="black"
              title={`${TranslateHelper.name()} :`}
              content={`${technician?.first_name} ${technician?.last_name}`}
            />
            <RichText
              color="black"
              visibility={Boolean(email)}
              title={`${TranslateHelper.email()} :`}
              content={email}
            />
            <RichText
              color="black"
              visibility={Boolean(phone)}
              title={`${TranslateHelper.phone()} :`}
              content={phone}
            />
            <RichText
              color="black"
              visibility={Boolean(group)}
              title={`${TranslateHelper.group()} :`}
              content={groupName}
            />
            <RichText
              color="black"
              visibility={Boolean(groupRole)}
              title={`${TranslateHelper.groupRole()} :`}
              content={groupRoleName}
            />
            <Typography variant="h6" children={groupRoleDesc} />
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={1} p={1} divider={<Divider />}>
        <Typography
          variant="h1"
          fontSize={13}
          children={TranslateHelper.jobInformation()}
        />
        <Grid container>
          <Grid item xs>
            <LoadingComp size={30} loading={!loadingStatuses}>
              <Stack
                p={1}
                direction="row"
                height={40}
                justifyContent="space-evenly"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Stack spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    children={TranslateHelper.canceledJobs()}
                  />
                  <Typography
                    variant="h1"
                    fontSize={13}
                    children={canceledJob?.count ?? 0}
                  />
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    children={TranslateHelper.doneJobs()}
                  />
                  <Typography
                    variant="h1"
                    fontSize={13}
                    children={doneJob?.count ?? 0}
                  />
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    children={TranslateHelper.continueJobs()}
                  />
                  <Typography
                    variant="h1"
                    fontSize={13}
                    children={continueJob?.count ?? 0}
                  />
                </Stack>
              </Stack>
            </LoadingComp>
          </Grid>
          <Grid item xs>
            <LoadingComp size={30} loading={!loadingRoles}>
              <Stack
                p={1}
                direction="row"
                height={40}
                justifyContent="space-evenly"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Stack spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    children={TranslateHelper.assigner()}
                  />
                  <Typography
                    variant="h1"
                    fontSize={13}
                    children={asignedJob?.count ?? "0"}
                  />
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    children={TranslateHelper.supervisor()}
                  />
                  <Typography
                    variant="h1"
                    fontSize={13}
                    children={supervisorJob?.count ?? "0"}
                  />
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    children={TranslateHelper.participant()}
                  />
                  <Typography
                    variant="h1"
                    fontSize={13}
                    children={concurrentJob?.count ?? "0"}
                  />
                </Stack>
              </Stack>
            </LoadingComp>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default TechnicianUserInfo;
