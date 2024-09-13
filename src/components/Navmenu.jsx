// import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navmenu.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function Navmenu() {
  const { user } = useContext(UserContext);
  const email = user?.email;
  return (
    <nav className={styles["nav-bar"]}>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="mouse"
          >
            About
          </ScrollLink>
        </li>
        <li>
          <NavLink to={"/"}>Articles</NavLink>
        </li>
        <li>
          <ScrollLink to="pricing" spy={true} smooth={true} className="mouse">
            Pricing
          </ScrollLink>
        </li>
        {email && (
          <li>
            <NavLink to="/dashboard" className="mouse">
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navmenu;
