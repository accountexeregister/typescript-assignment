import { Position } from "../Types/Position";

interface NotificationConfig {
    count: number;
    position: Position;
    disappearTime: number;
    setCount: (count: number) => void;
    setPosition: (position: Position) => void;
    setDisappearTime: (disappearTime: number) => void;
}

export default NotificationConfig;