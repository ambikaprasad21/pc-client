import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./Signup.module.css";
import LazyImage from "../utility/LazyImage";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Row from "./../ui/Row";
import { API } from "../utility/constant";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

const PasswordInput = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  input {
    flex-grow: 1;
  }

  span {
    position: absolute;
    right: 1rem;
    z-index: 10;
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { register, handleSubmit, getValues, formState, watch } = useForm();
  const { errors } = formState;

  const isDirty = useRef(false);

  const watchFields = watch();

  useEffect(() => {
    isDirty.current = true;
  }, [watchFields]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty.current) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Do you really want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function onSubmit(data) {
    console.log(data);
    async function sendOtp() {
      try {
        setLoader(true);
        const res = await fetch(`${API}/user/register/sendotp`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          // credentials: "include",
        });
        if (res.status === 200) {
          const data = await res.json();
          const token = data.token;
          const email = data.email;
          toast.success(`OTP delivered to ${email}`);
          navigate(`/auth/verify-otp/?user=${email}&verify=${token}`);
        } else {
          const data = await res.json();
          toast.error(data.message);
          // console.log(data.message);
        }
      } catch (err) {
        toast.error(err.message);
        console.log(err.message);
      } finally {
        setLoader(false);
      }
    }

    sendOtp();
  }

  function onError(errors) {
    console.log(errors);
  }
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
          <form
            className={styles["bottom-c"]}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className={styles["w-m"]}>
              <p>Welcome to ProzCollab!</p>
              <p className={styles["w-m-1"]}>Register your account</p>
            </div>
            <div className={styles["d-c"]}>
              <div className={styles["fn-ln"]}>
                <Row gap="5px">
                  <input
                    type="text"
                    placeholder="First name"
                    id="firstName"
                    {...register("firstName", {
                      required: "This field is required.",
                      minLength: {
                        value: 3,
                        message: "FirstName should be atleast 3 characters.",
                      },
                    })}
                  />
                  {errors?.firstName?.message && (
                    <Error>{errors.firstName.message}</Error>
                  )}
                </Row>

                <Row gap="5px">
                  <input
                    type="text"
                    placeholder="Last name"
                    id="lastName"
                    {...register("lastName", {
                      required: "This field is required.",
                      minLength: {
                        value: 3,
                        message: "LastName should be atleast 3 characters.",
                      },
                    })}
                  />
                  {errors?.lastName?.message && (
                    <Error>{errors.lastName.message}</Error>
                  )}
                </Row>
              </div>
              <Row gap="5px">
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  {...register("email", {
                    required: "This field is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Not a valid email.",
                    },
                  })}
                />
                {errors?.email?.message && (
                  <Error>{errors.email.message}</Error>
                )}
              </Row>

              <Row gap="5px">
                <PasswordInput>
                  <input
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    {...register("password", {
                      required: "This field is required.",
                      max: {
                        value: 8,
                        message: "password must be more than 7 characters.",
                      },
                    })}
                  />
                  <span onClick={() => setIsVisible((prev) => !prev)}>
                    {isVisible ? (
                      <MdVisibility size="2rem" color="#797979" />
                    ) : (
                      <MdVisibilityOff size="2rem" color="#797979" />
                    )}
                  </span>
                </PasswordInput>

                {errors?.password?.message && (
                  <Error>{errors.password.message}</Error>
                )}
              </Row>

              <Row gap="5px">
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "This field is required.",
                    validate: (value) =>
                      value === getValues().password ||
                      "Password and Confirm Password do not match.",
                  })}
                />
                {errors?.confirmPassword?.message && (
                  <Error>{errors.confirmPassword.message}</Error>
                )}
              </Row>
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
            <button className="auth-btn">
              {loader ? <SpinnerSm /> : "Get Started"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
