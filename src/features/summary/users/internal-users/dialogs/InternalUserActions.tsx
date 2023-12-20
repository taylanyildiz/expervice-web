import {
  DialogCustomActions,
  PrimaryButton,
  VisibilityComp,
} from "@Components/index";
import TranslateHelper from "@Local/index";
import { Avatar, Grid, Typography } from "@mui/material";
import { useInternal } from "../helper/internal_user_helper";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { caption, dateToFormat } from "@Utils/functions";

interface Props {
  onChanged: (type: EActionType) => void;
}

function InternalUserActions(props: Props) {
  /// Internal store
  const { internalUser } = useInternal();
  const isEdit = Boolean(internalUser);
  const creator = internalUser?.creator;
  const creatorDisplayName = `${creator?.first_name} ${creator?.last_name}`;

  /// Changed action
  const onChangedAction = (type: EActionType) => {
    props.onChanged(type);
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
                children={dateToFormat(internalUser?.created_at)}
              />
            </Grid>
          </Grid>
        ),
      }}
    />
  );
}

export default InternalUserActions;
