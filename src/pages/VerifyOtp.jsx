import { Suspense, useContext, useEffect, useRef, useState } from "react";
import styles from "./VerifyOtp.module.css";
import LazyImage from "../utility/LazyImage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API, APIHEADER } from "../utility/constant";
import toast from "react-hot-toast";
import SpinnerSm from "../ui/SpinnerSm";

function VerifyOtp() {
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [searchParams] = useSearchParams();

  const inputRefs = useRef([]);
  const navigate = useNavigate();

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

  const { user, setUser } = useContext(UserContext);

  async function handleVerifyOtp() {
    const otpCode = parseInt(otp.join(""), 10);
    const userEmail = searchParams.get("user");
    const verificationToken = searchParams.get("verify");
    try {
      setLoader(true);
      const res = await fetch(
        `${API}/user/verify/otp/register/?code=${otpCode}&user=${userEmail}&verify=${verificationToken}`,
        {
          method: "POST",
          headers: APIHEADER,
          // credentials: "include",
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        toast.success("Logged in successfully");
        setUser(data.data);
        localStorage.setItem("prozverify", data.token);
        navigate("/dashboard", { replace: true });
      } else {
        const data = await res.json();
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setLoader(false);
    }
  }
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

        <button className="otp-btn" onClick={() => handleVerifyOtp()}>
          {loader ? <SpinnerSm /> : "Verify & Continue"}
        </button>
        <Link className={styles["re-otp"]}>RESEND OTP</Link>
      </div>
    </div>
  );
}

export default VerifyOtp;
