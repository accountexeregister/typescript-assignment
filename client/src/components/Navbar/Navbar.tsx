import { NavLink } from "react-router-dom";
import "./Navbar.css";

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
            <hr className="navbar-hr" />
        </div>
    );
};

export default Navbar;