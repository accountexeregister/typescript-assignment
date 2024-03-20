import { useEffect, useState } from "react";
import { Position } from "./types/Position";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./Pages/Settings/Settings";
import Main from "./Pages/Main";
import "./App.css";

const App = () => {
    const localNotificationCount = localStorage.getItem("notificationCount");
    const localPosition = localStorage.getItem("position");
    const localNotificationDisappearTime = localStorage.getItem("notificationDisappearTime");

    const [notificationCount, setNotificationCount] = useState(localNotificationCount 
        ? parseInt(JSON.parse(localNotificationCount)) : 0);
    const [position, setPosition] = useState(localPosition 
        ? JSON.parse(localPosition) : "TOP_LEFT" as Position);
    const [notificationDisappearTime, setNotificationDisappearTime] = useState(localNotificationDisappearTime 
        ? parseFloat(JSON.parse(localNotificationDisappearTime)) : 0);
    const notificationConfig = {
        count: notificationCount,
        position: position,
        disappearTime: notificationDisappearTime,
        setCount: setNotificationCount,
        setPosition: setPosition,
        setDisappearTime: setNotificationDisappearTime
    };

    // Save changes of notification config settings to local storage
    useEffect(() => {
        localStorage.setItem("notificationCount", JSON.stringify(notificationCount));
        localStorage.setItem("position", JSON.stringify(position));
        localStorage.setItem("notificationDisappearTime", JSON.stringify(notificationDisappearTime));
    }, [notificationCount, position, notificationDisappearTime]);

    const router = createBrowserRouter([
        {
            element: (
                <>
                    <Navbar />
                    <Outlet />
                </>
            ),
            children: [
                {
                    path: "/",
                    element: <Main config={notificationConfig} />
                },
                {
                    path: "settings",
                    element: <Settings config={notificationConfig} />,
                }
            ]
        }
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

export default App;
