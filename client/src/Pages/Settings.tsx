import NotificationConfig from "../Interfaces/NotificationConfig";
import { Position } from "../Types/Position";

const Settings = (props: { config: NotificationConfig } ) => {
    return (
        <div>
            <div>
                Notification count: <input type="number" value={props.config.count} onChange={(e) => props.config.setCount(parseInt(e.target.value))} />
            </div>
            <div>
                Notification position: <select value={props.config.position} onChange={(e) => props.config.setPosition(e.target.value as Position)}>
                    <option value="TOP_LEFT">Position 1</option>
                    <option value="TOP_RIGHT">Position 2</option>
                    <option value="BOTTOM_LEFT">Position 3</option>
                    <option value="BOTTOM_RIGHT">Position 4</option>
                </select>
            </div>
            <div>
                Notification disappear time: <input type="number" value={props.config.disappearTime} onChange={(e) => props.config.setDisappearTime(parseInt(e.target.value))} />
            </div>
        </div>
    );
};

export default Settings;