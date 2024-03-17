import NotificationConfig from "../Interfaces/NotificationConfig";
import { Position } from "../Types/Position";
import "./Settings.css";

const Settings = (props: { config: NotificationConfig }) => {
    const { config } = props;
    const setConfigCountWithStorage = (count: number) => {
        localStorage.setItem("settings", JSON.stringify({count: count, position: config.position, disappearTime: config.disappearTime}));
        config.setCount(count);
        /*
        config.setCount(count => {
            localStorage.setItem("settings", JSON.stringify({count: count, position: config.position}));
            return count;
        });
        */
    };
    
    const setConfigPositionWithStorage = (position: Position) => {
        localStorage.setItem("settings", JSON.stringify({count: config.count, position: position, disappearTime: config.disappearTime}));
        config.setPosition(position);
        /*
        config.setPosition(position => {
            localStorage.setItem("settings", JSON.stringify({count: config.count, position: position}));
            return position;
        });
        */
    }

    const setConfigDissapearTimeWithStorage = (disappearTime: number) => {
        localStorage.setItem("settings", JSON.stringify({count: config.count, position: config.position, disappearTime: disappearTime}));
        config.setDisappearTime(disappearTime);
        /*
        config.setDisappearTime(disappearTime => {
            localStorage.setItem("settings", JSON.stringify({count: config.count, position: config.position}));
            return disappearTime;
        });
        */
    }
        
    return (
        <div className="settings-div">
            <div className="settings-container">
                <span>Notification count</span>
                <input
                    type="number"
                    value={config.count}
                    onChange={(e) => setConfigCountWithStorage(parseInt(e.target.value))}
                />
            </div>
            <div className="settings-container">
                <span>Notification position</span>
                <div className="settings-radio-button-div">
                    <label htmlFor="position1">Position 1</label>
                    <input
                        type="radio"
                        id="position1"
                        name="position"
                        value="TOP_LEFT"
                        checked={config.position === "TOP_LEFT"}
                        onChange={(e) => setConfigPositionWithStorage(e.target.value as Position)}
                    />

                    <label htmlFor="position2">Position 2</label>
                    <input
                        type="radio"
                        id="position2"
                        name="position"
                        value="TOP_RIGHT"
                        checked={config.position === "TOP_RIGHT"}
                        onChange={(e) => setConfigPositionWithStorage(e.target.value as Position)}
                    />

                    <label htmlFor="position3">Position 3</label>
                    <input
                        type="radio"
                        id="position3"
                        name="position"
                        value="BOTTOM_LEFT"
                        checked={config.position === "BOTTOM_LEFT"}
                        onChange={(e) => setConfigPositionWithStorage(e.target.value as Position)}
                    />

                    <label htmlFor="position4">Position 4</label>
                    <input
                        type="radio"
                        id="position4"
                        name="position"
                        value="BOTTOM_RIGHT"
                        checked={config.position === "BOTTOM_RIGHT"}
                        onChange={(e) => setConfigPositionWithStorage(e.target.value as Position)}
                    />
                </div>
            </div>
            <div className="settings-container">
                <span>Notification disappear time</span>
                <input
                    type="number"
                    value={config.disappearTime}
                    onChange={(e) => setConfigDissapearTimeWithStorage(parseInt(e.target.value))}
                />
                <span>sec</span>
            </div>
        </div>
    );
};


export default Settings;