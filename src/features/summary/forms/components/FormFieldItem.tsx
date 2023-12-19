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
import RichText from "@Components/RichText";

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
              <RichText
                color="black"
                visibility={Boolean(field.label)}
                title={`${TranslateHelper.label()} :`}
                content={field.label}
              />
              <RichText
                color="black"
                visibility={Boolean(field.description)}
                title={`${TranslateHelper.description()} :`}
                content={field.description}
              />
              <RichText
                alignItems="start"
                color="black"
                visibility={Boolean(
                  field.options && field.options?.length !== 0
                )}
                title={`${TranslateHelper.options()} :`}
                content={
                  <ul style={{ maxHeight: 100 }}>
                    {field.options?.map((e) => (
                      <li>{e.label}</li>
                    ))}
                  </ul>
                }
              />
              <RichText
                color="black"
                visibility={Boolean(field.default_value)}
                title={`${TranslateHelper.defaultValue()} :`}
                content={field.default_value}
              />
              <RichText
                contentProps={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: 11,
                }}
                visibility={Boolean(field.mandatory)}
                content={TranslateHelper.required()}
              />
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
