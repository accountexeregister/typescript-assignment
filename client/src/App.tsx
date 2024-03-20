import { useState } from "react";
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

    const [notificationCount, setNotificationCount] = useState(0);
    const [position, setPosition] = useState("TOP_LEFT" as Position);
    const [notificationDisappearTime, setNotificationDisappearTime] = useState(0);
    const notificationConfig = {
        count: notificationCount,
        position: position,
        disappearTime: notificationDisappearTime,
        setCount: setNotificationCount,
        setPosition: setPosition,
        setDisappearTime: setNotificationDisappearTime
    };

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
