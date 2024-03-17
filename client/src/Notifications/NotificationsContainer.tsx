import React, { useRef, useState, useEffect } from 'react';
import NotificationConfig from "../Interfaces/NotificationConfig";
import { Position } from "../Types/Position";
import Notification from "../Interfaces/Notification";
import NotificationItem from "./NotificationItem";
import "./NotificationsContainer.css";

const NotificationsContainer = (props: { position: Position, notifications: Notification[],
    config: NotificationConfig, deleteNotification: (id: number) => void, updateNotifications: (endingIndex: number) => void}) => {
    const { position, notifications, config, deleteNotification, updateNotifications } = props;
    const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);
    const notificationRefs = useRef<Array<HTMLDivElement | null>>([]);
    const offScreenContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const visibleItems: Notification[] = [];
        let totalHeight = 0;
        const maxTotalHeight = screen.height - 300; // to calculate max items that can fit on the screen without scrolling
        notifications.some((notification, index) => {
            const ref = notificationRefs.current[index];
            if (ref) {
                const height = ref.clientHeight;
                totalHeight += height;
                if (totalHeight <= maxTotalHeight) {
                    visibleItems.push(notification);
                    return false;
                }
            }
            return true;
        });


        setVisibleNotifications(visibleItems);
        if (visibleItems.length < notifications.length) {
            updateNotifications(visibleItems.length);
        }
    }, [notifications]);

    return (
        <div>
            {/* Renders invisible notifications for measuring NotificationItem heights */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', visibility: 'hidden' }} ref={offScreenContainerRef}>
                {notifications.map((notification, index) => (
                    <div key={notification.id} ref={el => notificationRefs.current[index] = el}>
                        <NotificationItem key={notification.id} notification={notification} config={config} deleteNotification={deleteNotification} />
                    </div>
                ))}
            </div>
            {/* Renders the actual notifications */}
            <div id="notifications-container" className={`notifications-container-${position}`}>
                {visibleNotifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} config={config} deleteNotification={deleteNotification} />
                ))}
            </div>
        </div>
    );
};

export default NotificationsContainer;
