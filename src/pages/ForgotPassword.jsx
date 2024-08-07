import { Suspense, useState } from "react";
import styles from "./ForgotPassword.module.css";
import LazyImage from "../utility/LazyImage";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";
import { API, APIHEADER } from "../utility/constant";

function ForgotPassword() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [send, setSend] = useState(false);

  async function hanleForgotPassword() {
    try {
      setLoader(true);
      const res = await fetch(`${API}/user/forgetpassword`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: APIHEADER,
      });

      if (res.status === 200) {
        const data = await res.json();
        setSend(true);
        toast.success(data.message);
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoader(false);
    }
  }
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
          <button className="otp-btn" onClick={hanleForgotPassword}>
            {loader ? <SpinnerSm /> : "Reset password"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
