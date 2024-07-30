import { Suspense } from "react";
import styles from "./Login.module.css";
import LazyImage from "../utility/LazyImage";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles["bg"]}>
      <div className={styles.container}>
        <div className={styles["img-bg"]}>
          <Suspense>
            <LazyImage
              src="/images/login.png"
              alt="Login illustration photo."
            />
          </Suspense>
        </div>
        <div className={styles["c-c"]}>
          <div className={styles["top-c"]}>
            <p>Don't have an account? </p>
            <Link to="/auth/signup" className={styles["sign-in"]}>
              SIGN UP
            </Link>
          </div>
          <div className={styles["bottom-c"]}>
            <div className={styles["w-m"]}>
              <p>Welcome Back!</p>
              <p className={styles["w-m-1"]}>
                Welcom back! please enter your details.
              </p>
            </div>
            <div className={styles["c-fp"]}>
              <div className={styles["d-c"]}>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
              </div>
              <Link to={"/auth/forgot-password"} className={styles.conditions}>
                Forgot password
              </Link>
            </div>

            <button className="auth-btn">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
