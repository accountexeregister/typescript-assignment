import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={`/`}>Main</Link>
                    </li>
                    <li>
                        <Link to={`settings`}>Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;