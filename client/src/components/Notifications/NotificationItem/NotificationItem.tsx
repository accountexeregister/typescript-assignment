import NotificationConfig from "../../../Interfaces/NotificationConfig";
import Notification from "../../../Interfaces/Notification";
import { Dispatch, SetStateAction, useEffect } from "react";
import "./NotificationItem.css";

const  NotificationItem = (props: { notification: Notification, config: NotificationConfig, deleteNotification: (id: number) => void }) => {
    const { notification, config, deleteNotification } = props;

    const addNotifTimeout = (notification: Notification) => {
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
        }
        notification.timeoutId = setTimeout(() => {
            deleteNotification(notification.id);
        }, config.disappearTime * 1000);
    }

    const removeNotifTimeout = (notification: Notification) => {    
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
        }
        notification.timeoutId = undefined;
    }

    useEffect(() => {
        if (!notification.timeoutId) {
            addNotifTimeout(notification);
        }

    }, [config.disappearTime]);

    return (
        <div className="notification-item" onMouseEnter = {() => removeNotifTimeout(notification)}
        onMouseLeave = {() => addNotifTimeout(notification)}>
            <div className="message">{notification.msg}</div>
            <button className="close-btn" onClick={() => deleteNotification(notification.id)}>X</button>
        </div>
    );
};

export default NotificationItem;