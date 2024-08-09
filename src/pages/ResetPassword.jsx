import { Suspense, useContext, useState } from "react";
import styles from "./ResetPassword.module.css";
import LazyImage from "../utility/LazyImage";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Row from "../ui/Row";
import styled from "styled-components";
import { API, APIHEADER } from "../utility/constant";
import { UserContext } from "../context/UserContext";
import SpinnerSm from "../ui/SpinnerSm";

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { setUser } = useContext(UserContext);

  async function onSubmit(data) {
    try {
      setLoader(true);
      const res = await fetch(`${API}/user/resetpassword/${resetToken}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: APIHEADER,
      });

      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("prozverify", data.token);
        setTimeout(() => {
          setUser(data.user);
          navigate("/dashboard", { replace: true });
        }, 1000);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <input
              type="text"
              required
              placeholder="Password"
              id="password"
              {...register("password")}
              className={styles["d-c"]}
            />
            {errors?.password?.message && (
              <Error>{errors.password.message}</Error>
            )}
          </Row>

          <Row>
            <input
              type="text"
              required
              placeholder="Confirm password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "This field is required.",
                validate: (value) =>
                  value === getValues().password ||
                  "Password and Confirm Password do not match.",
              })}
              className={styles["d-c"]}
            />
            {errors?.confirmPassword?.message && (
              <Error>{errors.confirmPassword.message}</Error>
            )}
          </Row>
          <button className="otp-btn">
            {loader ? <SpinnerSm /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
