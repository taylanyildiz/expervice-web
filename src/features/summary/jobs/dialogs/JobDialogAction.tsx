import { DialogCustomActions } from "@Components/dialogs";
import VisibilityComp from "@Components/VisibilityComp";
import PrimaryButton from "@Components/PrimaryButton";
import { Avatar, Grid, Typography } from "@mui/material";
import { caption, dateToFormat } from "@Utils/functions";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useJob } from "../helper/job_helper";
import TranslateHelper from "@Local/index";

interface JobDialogActionProps {
  onChanged: (type: EActionType) => void;
}

function JobDialogAction(props: JobDialogActionProps) {
  const { onChanged } = props;

  const { job } = useJob();
  const isEdit = Boolean(job);
  const creatorDisplayName = `${job?.creator?.first_name} ${job?.creator?.last_name}`;

  /// Changed action
  const onChangedAction = (type: EActionType) => {
    onChanged(type);
  };

  return (
    <DialogCustomActions
      actions={[
        <VisibilityComp
          visibility={isEdit}
          children={
            <PrimaryButton
              height={30}
              fontWeight="normal"
              color="black"
              children={TranslateHelper.delete()}
              variant="outlined"
              onClick={() => onChangedAction(EActionType.Delete)}
            />
          }
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.save()}
          onClick={() => onChangedAction(EActionType.Save)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.saveNew()}
          onClick={() => onChangedAction(EActionType.SaveNew)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.saveClose()}
          onClick={() => onChangedAction(EActionType.SaveClose)}
        />,
      ]}
      leading={{
        visibility: isEdit,
        children: (
          <Grid container alignItems="center" columnSpacing={1}>
            <Grid item>
              <Typography
                variant="body1"
                fontSize={12}
                color="grey"
                children={TranslateHelper.createdBy({
                  name: creatorDisplayName,
                })}
              />
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  height: 30,
                  width: 30,
                  fontSize: 12,
                  color: "white",
                  backgroundColor: "grey",
                }}
                children={caption(creatorDisplayName)}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                fontSize={12}
                color="grey"
                children={dateToFormat(job?.created_at)}
              />
            </Grid>
          </Grid>
        ),
      }}
    />
  );
}

export default JobDialogAction;
