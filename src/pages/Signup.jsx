import { Suspense } from "react";
import styles from "./Signup.module.css";
import LazyImage from "../utility/LazyImage";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className={styles["bg"]}>
      <div className={styles.container}>
        <div className={styles["img-bg"]}>
          <Suspense>
            <LazyImage
              src="/images/signup.png"
              alt="Sign up illustration photo."
            />
          </Suspense>
        </div>
        <div className={styles["c-c"]}>
          <div className={styles["top-c"]}>
            <p>Already have an account? </p>
            <Link to={"/auth/login"} className={styles["sign-in"]}>
              LOG IN
            </Link>
          </div>
          <div className={styles["bottom-c"]}>
            <div className={styles["w-m"]}>
              <p>Welcome to ProzCollab!</p>
              <p className={styles["w-m-1"]}>Register your account</p>
            </div>
            <div className={styles["d-c"]}>
              <div className={styles["fn-ln"]}>
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
              </div>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm password" />
            </div>
            <p className={styles.conditions}>
              You are agreeing to the{" "}
              <Link to={"/terms-of-services"} className={styles["tc"]}>
                Terms of Services
              </Link>{" "}
              <br /> and{" "}
              <Link to={"/privacy-policy"} className={styles["tc"]}>
                Privacy Policy
              </Link>
            </p>
            <button className="auth-btn">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
