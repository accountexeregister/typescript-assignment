import NotificationConfig from "../../Interfaces/NotificationConfig";
import { Position } from "../../types/Position";
import "./Settings.css";

const Settings = (props: { config: NotificationConfig }) => {
    const { config } = props;
    const setConfigCountWithStorage = (count: number) => {
        count = isNaN(count) ? 0 : count;
        config.setCount(count);
    };
    
    const setConfigPositionWithStorage = (position: Position) => {
        config.setPosition(position);
    };

    const setConfigDissapearTimeWithStorage = (disappearTime: number) => {
        disappearTime = isNaN(disappearTime) ? 0 : disappearTime;
        config.setDisappearTime(disappearTime);
    };
        
    return (
        <div className="settings-div">
            <div className="settings-container">
                <span>Notification count</span>
                <input
                    type="number"
                    min="0"
                    value={config.count.toString()}
                    onChange={(e) => setConfigCountWithStorage(Math.abs(parseInt(e.target.value)))}
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
                    min="0"
                    value={config.disappearTime.toString()}
                    onChange={(e) => setConfigDissapearTimeWithStorage(Math.abs(parseFloat(e.target.value)))}
                />
                <span>sec</span>
            </div>
        </div>
    );
};


export default Settings;