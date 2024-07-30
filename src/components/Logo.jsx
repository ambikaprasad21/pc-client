import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to={"/"} className={styles["logo-img"]}>
      <img
        src="/images/logo.png"
        alt="ProzCollab company logo."
        className={styles.img}
      />
    </Link>
  );
}

export default Logo;
