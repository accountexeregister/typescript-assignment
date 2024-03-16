import { useState } from "react";
import { Position } from "./Types/Position";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        path: "settings",
        element: <div>Settings</div>,
    }
]);

const App = () => {

    const [notificationCount, setNotificationCount] = useState(0);
    const [position, setPosition] = useState("TOP_LEFT");
    const [notificationDisappearTime, setNotificationDisappearTime] = useState(0);
    const notificationConfig = {
        count: notificationCount,
        position: position,
        disappearTime: notificationDisappearTime,
        setCount: setNotificationCount,
        setPosition: setPosition,
        setDisappearTime: setNotificationDisappearTime
    };

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

export default App;
