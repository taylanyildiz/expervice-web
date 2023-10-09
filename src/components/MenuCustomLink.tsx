import {
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/// Menu link item
interface LinkChildren {
  title?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onClick?: () => void;
}

/// Menu text link
interface LinkProps {
  title: string | ReactNode;
  to?: string;
  color?: string;
  hover?: boolean;
  children?: LinkChildren[];
  withIcon?: boolean;
}

function MenuCustomLink(props: LinkProps) {
  let { title, to, children, color, withIcon } = props;
  withIcon ??= true;

  /// Menu item target
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const open = Boolean(target);

  /// Open menu handle
  const onOpenMenuHandle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.currentTarget;
    setTarget(target);
  };

  /// Close menu handle
  const onCloseMenuHandle = () => {
    setTarget(null);
  };

  return (
    <>
      <div onClick={onOpenMenuHandle}>
        <Link className="link-router" to={to ?? "#"}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography
                className="link-router-typografy"
                color={color}
                sx={{
                  ":hover": {
                    color: color,
                  },
                }}
                children={title}
                variant="body1"
              />
            </Grid>
            {Boolean(children && withIcon) && (
              <Grid item alignContent="end" display="flex">
                <KeyboardArrowDownIcon
                  className="menu-icon"
                  sx={{ color: color, width: 20, height: 20 }}
                />
              </Grid>
            )}
          </Grid>
        </Link>
      </div>

      {/*  Menu */}
      {children && (
        <Menu
          sx={{ width: 600 }}
          open={open}
          anchorEl={target}
          onClose={onCloseMenuHandle}
          // MenuListProps={{ onMouseLeave: onCloseMenuHandle }}
        >
          {children?.map((e, index) => (
            <MenuItem
              key={index}
              sx={{ minWidth: 150 }}
              onClick={() => {
                onCloseMenuHandle();
                e.onClick?.();
              }}
            >
              {e.prefix && <ListItemIcon children={e.prefix} />}
              <ListItemText children={e.title} />
              <Typography
                variant="body2"
                color="text.secondary"
                children={e.suffix}
              />
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
}

export default MenuCustomLink;
