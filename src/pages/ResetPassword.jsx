import { Suspense } from "react";
import styles from "./ResetPassword.module.css";
import LazyImage from "../utility/LazyImage";

function ResetPassword() {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles["img-box"]}>
          <Suspense>
            <LazyImage
              src="/images/reset-password.png"
              alt="reset password illustration."
            />
          </Suspense>
        </div>
        <h1>Set new password</h1>

        <p>
          Reset your password, this page will expire after
          <br /> in <b>5 minutes</b>
        </p>

        <input
          type="text"
          required
          placeholder="Password"
          className={styles["d-c"]}
        />
        <input
          type="text"
          required
          placeholder="Confirm password"
          className={styles["d-c"]}
        />

        <button className="otp-btn">Reset password</button>
      </div>
    </div>
  );
}

export default ResetPassword;
