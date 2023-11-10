import VisibilityComp from "@Components/VisibilityComp";
import Field from "@Models/form/field";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import {
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

interface FormFieldItemProps {
  field: Field;

  onDelete: () => void;
  onEdit: () => void;
}

function FormFieldItem(props: FormFieldItemProps) {
  const { field, onDelete, onEdit } = props;

  return (
    <ListItem>
      <ListItemText
        primary={
          <Typography
            variant="h1"
            fontSize={13}
            children={field.field_type?.name}
          />
        }
        secondary={
          <Stack direction="column">
            <Typography
              fontWeight="bold"
              fontSize={11}
              children={
                <>
                  Label : <b style={{ fontWeight: "normal" }}>{field.label}</b>
                </>
              }
            />
            <VisibilityComp visibility={Boolean(field.description)}>
              <Typography
                fontWeight="bold"
                fontSize={11}
                children={
                  <>
                    Description :{" "}
                    <b style={{ fontWeight: "normal" }}>{field.description}</b>
                  </>
                }
              />
            </VisibilityComp>

            <VisibilityComp visibility={Boolean(field.options?.length !== 0)}>
              <Typography
                fontWeight="bold"
                fontSize={11}
                children={
                  <>
                    Options :{" "}
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
                children={
                  <>
                    Default Value :{" "}
                    <b style={{ fontWeight: "normal" }}>
                      {field.default_value}
                    </b>
                  </>
                }
              />
            </VisibilityComp>
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
