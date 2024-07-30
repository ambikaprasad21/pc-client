import { Suspense, useState } from "react";
import styles from "./ForgotPassword.module.css";
import LazyImage from "../utility/LazyImage";

function ForgotPassword() {
  const [email, setEmail] = useState(null);
  const [send, setSend] = useState(false);
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles["img-box"]}>
          <Suspense>
            <LazyImage
              src="/images/forgot-password.png"
              alt="forgot password illustration."
            />
          </Suspense>
        </div>
        <h1>Forgot password ?</h1>
        {send ? (
          <p>
            We send a link to <b>{email}</b>, follow it <br /> to reset your
            password
          </p>
        ) : (
          <>
            <p>
              Nothing to worry about, provide us your email id and we <br />
              will send password reset link.
            </p>

            <input
              type="text"
              required
              placeholder="Email"
              className={styles["d-c"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        {!send && (
          <button className="otp-btn" onClick={() => setSend(true)}>
            Reset password
          </button>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
