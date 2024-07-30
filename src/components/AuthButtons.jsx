import { NavLink } from "react-router-dom";
import styles from "./AuthButtons.module.css";

function AuthButtons() {
  return (
    <div className={styles.authbtns}>
      <NavLink to={"/auth/login"} className={`${styles.login}`}>
        Login
      </NavLink>
      <NavLink to={"/auth/signup"} className={`${styles.signup}`}>
        Sign up
      </NavLink>
    </div>
  );
}

export default AuthButtons;
