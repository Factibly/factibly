import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

const NotificationBell = () => {
  return (
    <Badge badgeContent={8} color="primary">
      <NotificationsIcon />
    </Badge>
  );
};

export default NotificationBell;
