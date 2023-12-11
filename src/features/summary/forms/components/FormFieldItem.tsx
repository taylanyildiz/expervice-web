import VisibilityComp from "@Components/VisibilityComp";
import Field from "@Models/form/field";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import {
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Colors from "@Themes/colors";
import TranslateHelper from "@Local/index";
import { useUser } from "@Features/summary/company/helper/company_helper";

interface FormFieldItemProps {
  field: Field;
  onDelete: () => void;
  onEdit: () => void;
}

function FormFieldItem(props: FormFieldItemProps) {
  const { field, onDelete, onEdit } = props;
  const isTitle = field.field_type?.id === 4;

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  return (
    <ListItem
      sx={{
        alignItems: "start",
        border: isTitle ? 4 : 1,
        borderColor: isTitle ? Colors.primary : "divider",
      }}
    >
      <DragIndicatorIcon sx={{ width: 20, height: 20, mt: 1 }} />
      <ListItemText
        primary={
          <Typography
            variant="h1"
            fontSize={13}
            maxWidth={200}
            overflow="clip"
            textOverflow="ellipsis"
            children={field.field_type?.translations?.name?.[lng]}
          />
        }
        secondary={
          <Stack direction="row">
            <Stack direction="column">
              <Typography
                fontWeight="bold"
                fontSize={11}
                maxWidth={200}
                overflow="clip"
                textOverflow="ellipsis"
                children={
                  <>
                    {TranslateHelper.label()} :{" "}
                    <b style={{ fontWeight: "normal" }}>{field.label}</b>
                  </>
                }
              />
              <VisibilityComp visibility={Boolean(field.description)}>
                <Typography
                  fontWeight="bold"
                  fontSize={11}
                  maxWidth={200}
                  overflow="clip"
                  textOverflow="ellipsis"
                  children={
                    <>
                      {TranslateHelper.description()} :{" "}
                      <b style={{ fontWeight: "normal" }}>
                        {field.description}
                      </b>
                    </>
                  }
                />
              </VisibilityComp>

              <VisibilityComp
                visibility={Boolean(
                  field.options && field.options?.length !== 0
                )}
              >
                <Typography
                  fontWeight="bold"
                  fontSize={11}
                  maxWidth={200}
                  overflow="clip"
                  textOverflow="ellipsis"
                  children={
                    <>
                      {TranslateHelper.options()} :{" "}
                      <b style={{ fontWeight: "normal" }}>
                        {field.options?.map((e) => `${e.label}, `)}
                      </b>
                    </>
                  }
                />
              </VisibilityComp>
              <VisibilityComp visibility={Boolean(field.default_value)}>
                <Typography
                  fontWeight="bold"
                  fontSize={11}
                  maxWidth={200}
                  overflow="clip"
                  textOverflow="ellipsis"
                  children={
                    <>
                      {TranslateHelper.defaultValue()} :{" "}
                      <b style={{ fontWeight: "normal" }}>
                        {field.default_value}
                      </b>
                    </>
                  }
                />
              </VisibilityComp>
            </Stack>
          </Stack>
        }
      />
      <IconButton onClick={onEdit}>
        <EditNoteOutlinedIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteOutlineIcon />
      </IconButton>
    </ListItem>
  );
}

export default FormFieldItem;
