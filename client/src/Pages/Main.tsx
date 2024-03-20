import { useEffect, useState } from "react";
import NotificationConfig from "../Interfaces/NotificationConfig";
import Notification from "../Interfaces/Notification";
import NotificationsContainer from "../components/Notifications/NotificationsContainer/NotificationsContainer";

const Main = (props: { config: NotificationConfig } ) => {
    const localNotifications = localStorage.getItem("notifications");
    const [notifications, setNotifications] = useState<Notification[]>(localNotifications 
        ? JSON.parse(localNotifications).slice(0, props.config.count) : []);


    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "notifications") {
                if (event.newValue) {
                    setNotifications(JSON.parse(event.newValue));
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
                if (event.newValue) {
                    setNotifications(prevNotifications => {
                        console.log("notifications", prevNotifications);
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
        const eventSource = new EventSource("http://127.0.0.1:9000/events");
        eventSource.onmessage = function(event: MessageEvent) {
            const data = JSON.parse(event.data);
            const notification : Notification = {id: data.msg_id, msg: data.msg};
            setNotifications(prevNotifications => [notification, ...prevNotifications].slice(0, props.config.count));
        };

        return () => {
            eventSource.close();
        };
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