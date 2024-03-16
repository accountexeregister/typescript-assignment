import NotificationConfig from "../Interfaces/NotificationConfig";
import { Position } from "../Types/Position";
import "./Settings.css";

const Settings = (props: { config: NotificationConfig }) => {
    return (
        <div className="settings-div">
            <div className="settings-container">
                <span>Notification count</span>
                <input
                    type="number"
                    value={props.config.count}
                    onChange={(e) => props.config.setCount(parseInt(e.target.value))}
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
                        checked={props.config.position === "TOP_LEFT"}
                        onChange={(e) => props.config.setPosition(e.target.value as Position)}
                    />

                    <label htmlFor="position2">Position 2</label>
                    <input
                        type="radio"
                        id="position2"
                        name="position"
                        value="TOP_RIGHT"
                        checked={props.config.position === "TOP_RIGHT"}
                        onChange={(e) => props.config.setPosition(e.target.value as Position)}
                    />

                    <label htmlFor="position3">Position 3</label>
                    <input
                        type="radio"
                        id="position3"
                        name="position"
                        value="BOTTOM_LEFT"
                        checked={props.config.position === "BOTTOM_LEFT"}
                        onChange={(e) => props.config.setPosition(e.target.value as Position)}
                    />

                    <label htmlFor="position4">Position 4</label>
                    <input
                        type="radio"
                        id="position4"
                        name="position"
                        value="BOTTOM_RIGHT"
                        checked={props.config.position === "BOTTOM_RIGHT"}
                        onChange={(e) => props.config.setPosition(e.target.value as Position)}
                    />
                </div>
            </div>
            <div className="settings-container">
                <span>Notification disappear time</span>
                <input
                    type="number"
                    value={props.config.disappearTime}
                    onChange={(e) => props.config.setDisappearTime(parseInt(e.target.value))}
                />
                <span>sec</span>
            </div>
        </div>
    );
};


export default Settings;