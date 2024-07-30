import { Suspense, useRef, useState } from "react";
import styles from "./VerifyOtp.module.css";
import LazyImage from "../utility/LazyImage";
import { Link } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input box
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles["img-box"]}>
          <Suspense>
            <LazyImage src="/images/otp.png" alt="otp message illustration." />
          </Suspense>
        </div>
        <h1>Please Verify Account</h1>
        <p>
          Enter the six digit code we sent to your email address to verify
          <br /> your new ProzCollab account:
        </p>
        <div className={styles["otp-input-container"]}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={styles["otp-input"]}
            />
          ))}
        </div>
        <button className="otp-btn" onClick={() => console.log(otp)}>
          Verify & Continue
        </button>
        <Link className={styles["re-otp"]}>RESEND OTP</Link>
      </div>
    </div>
  );
}

export default VerifyOtp;
