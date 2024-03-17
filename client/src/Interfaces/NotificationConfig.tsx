import { Dispatch, SetStateAction } from "react";
import { Position } from "../Types/Position";

interface NotificationConfig {
    count: number;
    position: Position;
    disappearTime: number;
    setCount: Dispatch<SetStateAction<number>>;
    setPosition: Dispatch<SetStateAction<Position>>;
    setDisappearTime: Dispatch<SetStateAction<number>>
}

export default NotificationConfig;