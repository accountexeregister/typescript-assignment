import NotificationConfig from "../Interfaces/NotificationConfig";
import Notification from "../Interfaces/Notification";
import { Dispatch, SetStateAction, useEffect } from "react";
import "./NotificationItem.css";

const  NotificationItem = (props: { notification: Notification, config: NotificationConfig, deleteNotification: (id: number) => void }) => {
    const { notification, config, deleteNotification } = props;

    useEffect(() => {
        notification.timeoutId = setTimeout(() => {
            deleteNotification(notification.id);
        }, config.disappearTime * 1000);

    }, [config.disappearTime]);

    return (
        <div className="notification-item">
            <div>{notification.msg}</div>
        </div>
    );
};

export default NotificationItem;