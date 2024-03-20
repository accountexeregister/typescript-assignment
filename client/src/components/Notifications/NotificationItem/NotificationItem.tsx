import NotificationConfig from "../../../Interfaces/NotificationConfig";
import Notification from "../../../Interfaces/Notification";
import { useEffect } from "react";
import "./NotificationItem.css";

const  NotificationItem = (props: { notification: Notification, config: NotificationConfig, deleteNotification: (id: number) => void }) => {
    const { notification, config, deleteNotification } = props;

    const addNotifTimeout = (notification: Notification) => {
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
        }
        // Set timeout to delete the notification after the disappear time, and store the 
        // timeout id in the notification
        notification.timeoutId = setTimeout(() => {
            deleteNotification(notification.id);
        }, config.disappearTime * 1000);
    };

    const removeNotifTimeout = (notification: Notification) => {  
        // Remove the timeout if the notification is hovered, using the timeout id in notification to clear it  
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
        }
        notification.timeoutId = undefined;
    };

    useEffect(() => {
        // When the notification item is rendered, add timeout if it does not exist yet
        if (!notification.timeoutId) {
            addNotifTimeout(notification);
        }

    }, []);

    return (
        <div className="notification-item" onMouseEnter = {() => removeNotifTimeout(notification)}
            onMouseLeave = {() => addNotifTimeout(notification)}>
            <div className="message">{notification.msg}</div>
            <button className="close-btn" onClick={() => deleteNotification(notification.id)}>X</button>
        </div>
    );
};

export default NotificationItem;