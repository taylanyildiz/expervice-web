import { Badge, BadgeProps, IconButton, styled } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationRepository from "@Repo/notification_repository";
import { AppDispatch, RootState } from "@Store/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 10,
    padding: "0 4px",
  },
}));

function NotificationIcon() {
  /// Notification store
  const {
    notifications: { rows, unread_count },
  } = useSelector((state: RootState) => state.notification);

  /// Notification repo
  const notificationRepo = new NotificationRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch();

  /// Initialize component
  useEffect(() => {
    notificationRepo.getNotifications();
  }, []);

  return (
    <StyledBadge badgeContent={unread_count} max={10} color="primary">
      <IconButton size="small">
        <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
      </IconButton>
    </StyledBadge>
  );
}

export default NotificationIcon;
