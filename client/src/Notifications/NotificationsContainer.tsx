import NotificationConfig from "../Interfaces/NotificationConfig";
import { Position } from "../Types/Position";
import Notification from "../Interfaces/Notification";
import NotificationItem from "./NotificationItem";
import "./NotificationsContainer.css"

const NotificationsContainer = (props: { position: Position, notifications: Notification[],
    config: NotificationConfig, deleteNotification: (id: number) => void}) => {
    const { position, notifications, config, deleteNotification } = props;
    return (
        <div id="notifications-container" className={`notifications-container-${position}`}>
        {notifications.slice(0, config.count).map((notification) => (
            <NotificationItem key={notification.id} notification={notification} config={config} deleteNotification={deleteNotification} />
        ))}
        </div>
    );
    }
    
export default NotificationsContainer;