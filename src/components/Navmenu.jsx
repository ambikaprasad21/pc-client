// import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navmenu.module.css";

function Navmenu() {
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
          <NavLink to={"/articles"}>Articles</NavLink>
        </li>
        <li>
          <ScrollLink to="pricing" spy={true} smooth={true} className="mouse">
            Pricing
          </ScrollLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navmenu;
