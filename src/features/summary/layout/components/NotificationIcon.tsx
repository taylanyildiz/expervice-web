import {
  Badge,
  BadgeProps,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemText,
  Menu,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationRepository from "@Repo/notification_repository";
import { AppDispatch, RootState } from "@Store/index";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, ReactNode, useEffect, useState } from "react";
import PrimaryButton from "@Components/PrimaryButton";
import Notification from "@Models/notification/notification";
import {
  setNotificationFilter,
  setNotifications,
} from "@Store/notification_store";
import { timeAgo } from "@Utils/functions";
import { ENotificationType } from "../entities/notification_enums";
import { useJobDialog } from "@Features/summary/jobs/helper/job_helper";
import { useUnitDialog } from "@Features/summary/units/helper/unit_helper";
import VisibilityComp from "@Components/VisibilityComp";
import Colors from "@Themes/colors";
import { useMatch } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import { setUnitId } from "@Store/unit_store";
import { setJobId } from "@Store/job_store";
import { useUser } from "@Features/summary/company/helper/company_helper";
import TranslateHelper from "@Local/index";

/// Badge styled
const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 10,
    padding: "0 4px",
  },
}));

function NotificationItem(props: { item: Notification; onClick: () => void }) {
  const { item, onClick } = props;

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  return (
    <Grid container direction="row">
      <Grid item>
        <VisibilityComp visibility={!item.is_read!}>
          <Box
            height="100%"
            width={3}
            sx={{ backgroundColor: Colors.primary }}
          />
        </VisibilityComp>
      </Grid>
      <Grid item flex={1}>
        <ListItemText
          onClick={onClick}
          sx={{
            m: 0,
            p: 1,
            ":hover": {
              cursor: "pointer",
              backgroundColor: "rgb(98, 213, 214, 0.4)",
            },
          }}
          primaryTypographyProps={{
            variant: "h1",
            fontSize: 14,
          }}
          primary={
            <Stack direction="row" justifyContent="space-between">
              {item.detail?.translations?.title?.[lng]}
              <Typography fontSize={11} children={timeAgo(item.created_at)} />
            </Stack>
          }
          secondary={item.detail?.translations?.body?.[lng]}
        />
      </Grid>
    </Grid>
  );
}

function NotificationMenu(props: {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  onMarkAll: () => void;
  disabledMark: boolean;
}) {
  const { children, anchorEl, open, handleClose, onMarkAll, disabledMark } =
    props;

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <div style={{ width: 500, overflow: "hidden" }}>
        <Stack width="100%" direction="column" divider={<Divider />}>
          <Stack p={1} direction="row" justifyContent="space-between">
            <Typography
              variant="h1"
              fontSize={20}
              children={TranslateHelper.notifications()}
            />
            <PrimaryButton
              disabled={disabledMark}
              onClick={onMarkAll}
              fontWeight="normal"
              variant="text"
              color="blue"
              children={TranslateHelper.markAllRead()}
            />
          </Stack>
          {children}
        </Stack>
      </div>
    </Menu>
  );
}

function NotificationIcon() {
  const unitMatch = useMatch(ERouter.Units);
  const unitMapMatch = useMatch(ERouter.UnitsMap);
  const jobMatch = useMatch(ERouter.Jobs);

  /// Notification store
  const {
    notifications: { rows, unread_count },
    notificationFilter: filter,
  } = useSelector((state: RootState) => state.notification);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /// Notification repo
  const notificationRepo = new NotificationRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch();

  /// Initialize component
  useEffect(() => {
    dispatch(setNotifications({ rows: [], unread_count: 0, count: 0 }));
    dispatch(setNotificationFilter({ limit: 10, offset: 0 }));
  }, []);

  /// Get Notifications depends on [filter]
  useEffect(() => {
    notificationRepo.getNotifications();
  }, [filter]);

  /// Job dialog hook
  const { openJobDialog } = useJobDialog();

  /// Unit dailog hook
  const { openUnitDialog } = useUnitDialog();

  const handleClickItem = (item: Notification) => {
    const data = item.detail?.data;
    const jobId = data?.job_id;
    const unitId = data?.unit_id;
    switch (item.detail?.notification_type) {
      case ENotificationType.CustomerFormSign:
        break;
      case ENotificationType.JobTechnicianCreate:
        if (jobMatch) {
          return dispatch(setJobId(jobId));
        }
        openJobDialog({ id: parseInt(jobId!) });
        break;
      case ENotificationType.JobUpdate:
        if (jobMatch) {
          return dispatch(setJobId(jobId));
        }
        openJobDialog({ id: parseInt(jobId!) });
        break;
      case ENotificationType.JobCreated:
        if (jobMatch) {
          return dispatch(setJobId(jobId));
        }
        openJobDialog({ id: parseInt(jobId!) });
        break;
      case ENotificationType.JobTechnicianRemoved:
        break;
      case ENotificationType.TechnicianGroupRoleUpdate:
        break;
      case ENotificationType.TechnicianGroupUpdate:
        break;
      case ENotificationType.TechnicianJobRoleUpdate:
        break;
      case ENotificationType.UnitCreate:
        if (unitMapMatch || unitMatch) {
          return dispatch(setUnitId(unitId));
        }
        openUnitDialog(parseInt(unitId!));
        break;
      case ENotificationType.UnitStatusUpdate:
        if (unitMapMatch || unitMatch) {
          return dispatch(setUnitId(unitId));
        }
        openUnitDialog(parseInt(unitId!));
        break;
    }
    handleClose();
  };

  const handleMarkReadAll = () => {
    notificationRepo.readNotifications();
  };

  return (
    <div>
      <StyledBadge badgeContent={unread_count} max={10} color="primary">
        <IconButton onClick={handleClick} size="small">
          <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </StyledBadge>
      <NotificationMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        onMarkAll={handleMarkReadAll}
        disabledMark={unread_count === 0}
      >
        <List
          disablePadding
          sx={{ maxHeight: 400, overflowY: "scroll" }}
          onScroll={(e) => {
            const current = e.currentTarget;
            const dif =
              current.scrollHeight - current.scrollTop - current.clientHeight;
            const bottom = dif <= 10;
            if (!bottom) return;
            dispatch(
              setNotificationFilter({
                ...filter,
                offset: filter.offset + 10,
              })
            );
          }}
        >
          <VisibilityComp visibility={rows.length !== 0}>
            {rows.map((item, index) => (
              <Fragment key={`notification-item-${index}`}>
                <NotificationItem
                  key={`notification-${index}`}
                  item={item}
                  onClick={() => handleClickItem(item)}
                />
                <Divider sx={{ m: 0, p: 0 }} key={`divider-${index}`} />
              </Fragment>
            ))}
          </VisibilityComp>
          <VisibilityComp visibility={rows.length === 0}>
            <Box
              mt={2}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography children={TranslateHelper.noFoundNotifications()} />
            </Box>
          </VisibilityComp>
        </List>
      </NotificationMenu>
    </div>
  );
}

export default NotificationIcon;
