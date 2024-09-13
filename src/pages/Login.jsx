import { Suspense, useContext, useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import LazyImage from "../utility/LazyImage";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Row from "../ui/Row";
import styled from "styled-components";
import toast from "react-hot-toast";
import { API, APIHEADER } from "../utility/constant";
import { UserContext } from "../context/UserContext";
import SpinnerSm from "../ui/SpinnerSm";
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

function Login() {
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const { setUser, setProzVerify } = useContext(UserContext);

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

  async function onSubmit(data) {
    try {
      setLoader(true);
      const res = await fetch(`${API}/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: APIHEADER,
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success("Logged in successfully");
        setUser(data.data);
        setProzVerify(data.token);
        localStorage.setItem("prozverify", data.token);
        navigate("/dashboard");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoader(false);
    }
    // console.log(data);
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
          <form
            className={styles["bottom-c"]}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className={styles["w-m"]}>
              <p>Welcome Back!</p>
              <p className={styles["w-m-1"]}>
                Welcom back! please enter your details.
              </p>
            </div>
            <div className={styles["c-fp"]}>
              <div className={styles["d-c"]}>
                <Row gap="5px">
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    {...register("email", {
                      required: "This field is required.",
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
              </div>
              <Link to={"/auth/forgot-password"} className={styles.conditions}>
                Forgot password
              </Link>
            </div>

            <button className="auth-btn">
              {loader ? <SpinnerSm /> : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
