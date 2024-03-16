import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const linkStyle = {
    color: "white",
    textDecoration: "none"
};
const CustomNavLink = (props: {to: string, text: string}) => {
    return (<NavLink className={({isActive}) =>
        "nav-link" + (isActive ? "-active" : "")
    } to={props.to}>{props.text}</NavLink>);
};

const Navbar = () => {
    return (
        <div>
            <nav>
                <span className="notification-task">Notification task</span>
                <ul>
                    <li>
                        <CustomNavLink to={"/"} text={"Main"} />
                    </li>
                    <li>
                        <CustomNavLink to={"/settings"} text={"Settings"} />
                    </li>
                </ul>
            </nav>
            <hr style={{ margin: 0 }} />
        </div>
    );
};

export default Navbar;