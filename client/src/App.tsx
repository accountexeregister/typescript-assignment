import { useState } from "react";
import { Position } from "./Types/Position";

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
    }

    return (
        <h1>Write your code here!</h1>
    );
};

export default App;
