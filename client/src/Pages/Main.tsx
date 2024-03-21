import { useEffect, useState } from "react";
import NotificationConfig from "../Interfaces/NotificationConfig";
import Notification from "../Interfaces/Notification";
import NotificationsContainer from "../components/Notifications/NotificationsContainer/NotificationsContainer";

const Main = (props: { config: NotificationConfig } ) => {
    const HOST = "127.0.0.1";
    const PORT = 9000;
    const localNotifications = localStorage.getItem("notifications");
    // Set initial notifications to notifications stored by local storage (if it exists) or empty array
    const [notifications, setNotifications] = useState<Notification[]>(localNotifications 
        ? JSON.parse(localNotifications).slice(0, props.config.count) : []);

    // Save changes of notifications to local storage
    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);

    // Sets up event handling of changes to local storage to change notifications and notification config settings
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "notifications") {
                if (event.newValue) {
                    setNotifications(JSON.parse(event.newValue).slice(0, props.config.count));
                }
            } 

            if (event.key === "notificationCount") {
                if (event.newValue) {
                    props.config.setCount(parseInt(JSON.parse(event.newValue)));
                }
            }
            if (event.key === "position") {
                if (event.newValue) {
                    props.config.setPosition(JSON.parse(event.newValue));
                }
            }
            if (event.key === "notificationDisappearTime") {
                // When notification disappear time changes, clear all timeouts of notifications
                // to reset timeouts with new disappear time
                if (event.newValue) {
                    setNotifications(prevNotifications => {
                        prevNotifications.forEach(notification => {
                            if (notification.timeoutId) {
                                clearTimeout(notification.timeoutId);
                            }
                        });
                        return prevNotifications;
                    });
                    props.config.setDisappearTime(parseInt(JSON.parse(event.newValue)));
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    useEffect(() => {
        const eventSource = new EventSource(`http://${HOST}:${PORT}/events`);
        eventSource.onmessage = function(event: MessageEvent) {
            const data = JSON.parse(event.data);
            const notification : Notification = {id: data.msg_id, msg: data.msg};
            setNotifications(prevNotifications => [notification, ...prevNotifications].slice(0, props.config.count));
        };

        return () => {
            eventSource.close();
        };
    }, [props.config.count]);

    useEffect(() => {
        setNotifications(prevNotifications => {
            prevNotifications.forEach(notification => {
                if (notification.timeoutId) {
                    clearTimeout(notification.timeoutId);
                }
            });
            return prevNotifications;
        });
    }, []);


    const deleteNotification = (id: number) => {
        setNotifications(prevNotifications => prevNotifications.filter((notification) => notification.id !== id));
    };


    return (
        <NotificationsContainer position={props.config.position} notifications={notifications} config={props.config} 
            deleteNotification={deleteNotification}/>
    );
};

export default Main;