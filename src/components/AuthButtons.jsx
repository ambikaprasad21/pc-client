import { Link, NavLink } from "react-router-dom";
import styles from "./AuthButtons.module.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "../ui/Button";
import Avatar from "./Avatar";
import Row from "../ui/Row";

function AuthButtons() {
  const { user, handleLogout } = useContext(UserContext);
  const email = user?.email;
  return (
    <div className={styles.authbtns}>
      {!email && (
        <>
          <NavLink to={"/auth/login"} className={`${styles.login}`}>
            Login
          </NavLink>
          <NavLink to={"/auth/signup"} className={`${styles.signup}`}>
            Sign up
          </NavLink>
        </>
      )}
      {email && (
        <Row type="horizontal">
          <div>{`${user.firstName} ${user.lastName}`}</div>
          <Button variation="primary" size="small" onClick={handleLogout}>
            Logout
          </Button>
          <Link
            to={"/dashboard"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Avatar size={"small"} src={"/images/z.jpg"} />
          </Link>
        </Row>
      )}
    </div>
  );
}

export default AuthButtons;
