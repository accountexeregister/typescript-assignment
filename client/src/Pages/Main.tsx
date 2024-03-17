import { useEffect, useState } from "react";
import NotificationConfig from "../Interfaces/NotificationConfig";
import Notification from "../Interfaces/Notification";
import NotificationsContainer from "../Notifications/NotificationsContainer";

const Main = (props: { config: NotificationConfig } ) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    
    const deleteNotification = (id: number) => {
        setNotifications(prevNotifications => {
            const newNotifications = prevNotifications.filter((notification) => notification.id !== id);
            localStorage.setItem("notifications", JSON.stringify(newNotifications));
            return newNotifications;
        });
    };

    const updateNotifications = (endingIndex: number) => {
        setNotifications((prevNotifications) => {
            const newNotifications = prevNotifications.slice(0, endingIndex);
            localStorage.setItem("notifications", JSON.stringify(newNotifications));
            return prevNotifications.slice(0, endingIndex)
        });
    };

    const setNotificationsWithStorage = (notification: Notification) => {
        setNotifications(prevNotifications => {
            const newNotifications = [notification, ...prevNotifications];
            localStorage.setItem("notifications", JSON.stringify(newNotifications));
            return newNotifications;
        });
    }

    useEffect(() => {
        // Obtain notifications from localStorage when the component mounts
        console.log(localStorage.getItem("notifications"));
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
            setNotifications(JSON.parse(storedNotifications));
        }
    }, [localStorage.getItem("notifications")]);

    /*
    useEffect(() => {
        // Save notifications to localStorage whenever the notifications state changes
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);
    */

    useEffect(() => {
        const eventSource = new EventSource("http://127.0.0.1:9000/events");
        eventSource.onmessage = function(event: MessageEvent) {
            const data = JSON.parse(event.data);
            const notification : Notification = {id: data.msg_id, msg: data.msg};
            setNotificationsWithStorage(notification);
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
            deleteNotification={deleteNotification} updateNotifications={updateNotifications}/>
    );
};

export default Main;