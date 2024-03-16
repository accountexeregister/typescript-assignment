import { useEffect, useState } from "react";
import NotificationConfig from "../Interfaces/NotificationConfig";
import Notification from "../Interfaces/Notification";
import NotificationsContainer from "../Notifications/NotificationsContainer";

const Main = (props: { config: NotificationConfig } ) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    
    const deleteNotification = (id: number) => {
        setNotifications(prevNotifications => prevNotifications.filter((notification) => notification.id !== id));
    };


    useEffect(() => {
        const eventSource = new EventSource("http://127.0.0.1:9000/events");
        eventSource.onmessage = function(event: MessageEvent) {
            const data = JSON.parse(event.data);
            const notification : Notification = {id: data.msg_id, msg: data.msg};
            setNotifications(prevNotifications => [
                ...prevNotifications, 
                notification
            ]);
            // notification.timeoutId = setTimeout(() => deleteNotification(notification.id), props.config.disappearTime * 1000);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        notifications.forEach((notification) => {
            if (notification.timeoutId) {
                clearTimeout(notification.timeoutId);
                notification.timeoutId = undefined;
            }
            // setTimeout(() => deleteNotification(notification.id), props.config.disappearTime * 1000);
        });
    }, [props.config.disappearTime]);


    return (
        <NotificationsContainer position={props.config.position} notifications={notifications} config={props.config} 
            deleteNotification={deleteNotification} />
    );
};

export default Main;