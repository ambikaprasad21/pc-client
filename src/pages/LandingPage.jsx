import { Suspense, useContext, useEffect, useState } from "react";

import axios from "axios";

import Header from "../components/Header";
import LazyImage from "./../utility/LazyImage";
import styles from "./LandingPage.module.css";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { API, key_razorpay } from "../utility/constant";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";

function LandingPage() {
  // const { user, setUser } = useContext(UserContext);
  // useEffect(() => {
  //   setUser(user);
  // }, [user]);

  return (
    <div id="home">
      <div className={styles["header-hero"]}>
        <div className={styles["h"]}>
          <Header />
        </div>
        <Hero />
      </div>
      <About />
      <Pricing />
      <Questions />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles["text-container"]}>
        <div className={styles["intro-text"]}>
          <h1>
            The easiest way to <br /> manage team projects <br />
            and tasks...
          </h1>
          <p>
            Efficiently manage projects, track progress, collaborate with your
            team, and streamline workflows with our comprehensive project
            management tool. Enjoy advanced analytics and extended project
            creation capabilities with our premium plans.
          </p>
        </div>
        <div>
          <NavLink to={"/auth/login"}>
            <button>Start free trial</button>
          </NavLink>
        </div>
      </div>
      <div className={styles["img-container"]}>
        <div className={styles["hero-img"]}>
          <Suspense>
            <LazyImage
              src="/images/hero-img.png"
              alt="A group of persons discussing."
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className={styles["about"]} id="about">
      <div className={styles["a-intro"]}>
        <h1>
          Discover Our Comprehensive <br /> Suites of{" "}
          <span className={styles["a-i-lg"]}>Features And Benefits</span>
        </h1>
        <p>
          Welcome to ProzCollab, your ultimate solution for seamless project
          management. At ProzCollab, we are dedicated to providing a
          comprehensive platform designed to streamline your project workflows
          and enhance team collaboration. Here’s what makes us the go-to choice
          for all your project management needs.
        </p>
      </div>

      <div className={styles["a-l"]}>
        <div className={styles["odd"]}>
          <div className={styles["a-i-c"]}>
            <div className={styles["about-img"]}>
              <Suspense>
                <LazyImage
                  src="/about-images/Comprehensive-Project-creation.jpg"
                  alt="Comprehensive-Project-creation."
                />
              </Suspense>
            </div>
          </div>
          <div className={styles["a-t"]}>
            <h2>Comprehensive Project Creation</h2>
            <div className={styles["a-t-p"]}>
              <p>
                Easily create new projects and tailor them to specific needs.
              </p>
              <p>
                Provides a solid foundation for starting any project
                efficiently.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["even"]}>
          <div className={styles["a-i-c"]}>
            <div className={styles["about-img"]}>
              <Suspense>
                <LazyImage
                  src="/about-images/Seamless-Team-Collaboration.jpg"
                  alt="Seamless-Team-Collaboration."
                />
              </Suspense>
            </div>
          </div>
          <div className={styles["a-t"]}>
            <h2>Seamless Team Collaboration</h2>
            <div className={styles["a-t-p"]}>
              <p>
                Add and manage team members within each project for real-time
                collaboration.
              </p>
              <p>
                Encourages teamwork and ensures everyone is aligned with the
                project goals.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["odd"]}>
          <div className={styles["a-i-c"]}>
            <div className={styles["about-img"]}>
              <Suspense>
                <LazyImage
                  src="./about-images/Robust-Task-Management.jpg"
                  alt="Robust-Task-Managment."
                />
              </Suspense>
            </div>
          </div>
          <div className={styles["a-t"]}>
            <h2>Robust Task Management</h2>
            <div className={styles["a-t-p"]}>
              <p>Create, assign, and monitor tasks within each project.</p>
              <p>
                Keeps the project on track and ensures clarity in
                responsibilities and deadlines.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["even"]}>
          <div className={styles["a-i-c"]}>
            <div className={styles["about-img"]}>
              <Suspense>
                <LazyImage
                  src="./about-images/In-Depth-Analytics.jpg"
                  alt="In-Depth-Analytics."
                />
              </Suspense>
            </div>
          </div>
          <div className={styles["a-t"]}>
            <h2>In-Depth Analytics</h2>
            <div className={styles["a-t-p"]}>
              <p>
                Track progress, measure performance, and gain insights with
                detailed analytics.
              </p>
              <p>
                Enables data-driven decisions, ensuring continuous improvement
                and success.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["odd"]}>
          <div className={styles["a-i-c"]}>
            <div className={styles["about-img"]}>
              <Suspense>
                <LazyImage
                  src="./about-images/Efficient-File-Management.jpg"
                  alt="Efficient-File-Management."
                />
              </Suspense>
            </div>
          </div>
          <div className={styles["a-t"]}>
            <h2>Efficient File Management</h2>
            <div className={styles["a-t-p"]}>
              <p>Managers can add attachments to specific projects or tasks.</p>
              <p>
                Keeps all relevant documents organized and easily accessible,
                streamlining project execution.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["even"]}>
          <div className={styles["a-i-c"]}>
            <div className={styles["about-img"]}>
              <Suspense>
                <LazyImage
                  src="./about-images/Interactive-Communication.jpg"
                  alt="Interactive Communication."
                />
              </Suspense>
            </div>
          </div>
          <div className={styles["a-t"]}>
            <h2>Interactive Communication</h2>
            <div className={styles["a-t-p"]}>
              <p>
                Receive notifications and engage with team members through a
                comment section.
              </p>
              <p>
                Ensures timely updates and vibrant communication, enhancing
                collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pricing() {
  const { user, prozVerify } = useContext(UserContext);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const navigate = useNavigate();
  // prozVerify = localStorage.getItem("prozverify");

  async function verifyPayment(data, plantype, typeOfPurchase) {
    try {
      const res = await axios.post(
        `${API}/user/paymentverification`,
        {
          data,
          user,
          plantype,
        },
        { headers: { Authorization: `Bearer ${prozVerify}` } }
      );

      if (!res.data.status) {
        toast.error("Payment failed.");
      } else {
        if (res.data.redirectUrl) {
          window.location.href = res.data.redirectUrl;
        }
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      if (typeOfPurchase === "advanced") {
        setLoader1(false);
      } else {
        setLoader2(false);
      }
    }
  }

  const handlePurchase = async (e) => {
    const planType = e.target.getAttribute("planType");
    const typeOfPurchase = e.target.getAttribute("planType");
    if (typeOfPurchase === "advanced") {
      setLoader1(true);
    } else {
      setLoader2(true);
    }
    const {
      data: { order },
    } = await axios.post(
      `${API}/user/checkout`,
      {
        planType,
      },
      { headers: { Authorization: `Bearer ${prozVerify}` } }
    );

    const options = {
      key: key_razorpay,
      amount: order.amount,
      currency: "INR",
      name: "ProzCollab",
      description: "Subscribing to prozcollab.",
      image: "https://i.ibb.co/cXnhqVT/logo.png",
      order_id: order.id,
      handler: function (response) {
        verifyPayment(response, planType, typeOfPurchase);
      },
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: `${user.email}`,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

    // console.log(window);
  };

  return (
    <div className={styles.pricing} id="pricing">
      <h1>
        Find the <span className={styles["h-u"]}>Right Plan.</span>
      </h1>
      <div className={styles["p-cards"]}>
        <div className={styles["p-card"]}>
          <div className={styles["p-c-info"]}>
            <h2>Free Forever</h2>
            <div className={styles["amount"]}>
              <span className={styles["currency"]}>₹</span>
              <span className={styles["value"]}>0</span>
              <span className={styles["amount-desc"]}>per month</span>
            </div>
            <div className={styles["p-items"]}>
              <div className={styles["p-item"]}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </i>
                <p>2 free projects</p>
              </div>
              <div className={styles["p-item"]}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </i>
                <p>
                  can upload 10 images, 10 pdfs to each project and task as
                  attachments
                </p>
              </div>
              <div className={`${styles["p-item"]} ${styles["r-c"]}`}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </i>
                <p>No project analytics</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles["p-card"]} ${styles["p-advanced"]}`}>
          <div className={styles["p-c-info"]}>
            <h2>Advanced</h2>
            <div className={styles["amount"]}>
              <span className={styles["currency"]}>₹</span>
              <span className={styles["value"]}>749</span>
              <span className={styles["amount-desc"]}>per month</span>
            </div>
            <div className={styles["p-items"]}>
              <div className={styles["p-item"]}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </i>
                <p>create unlimited projects</p>
              </div>
              <div className={styles["p-item"]}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </i>
                <p>
                  can upload 20 images, 20 pdfs to each project and task as
                  attachments
                </p>
              </div>
              <div className={`${styles["p-item"]}`}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </i>
                <p>project analytics</p>
              </div>
            </div>
          </div>
          <div>
            <button
              className={`${styles["p-c-b"]} ${styles["s-b"]}`}
              planType="advanced"
              onClick={(e) => handlePurchase(e)}
            >
              {loader1 ? <SpinnerSm /> : "PURCHASE"}
            </button>
          </div>
        </div>
        <div className={styles["p-card"]}>
          <div className={styles["p-c-info"]}>
            <h2>Basic</h2>
            <div className={styles["amount"]}>
              <span className={styles["currency"]}>₹</span>
              <span className={styles["value"]}>249</span>
              <span className={styles["amount-desc"]}>per month</span>
            </div>
            <div className={styles["p-items"]}>
              <div className={styles["p-item"]}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </i>
                <p>2 free projects + 2 more projects</p>
              </div>
              <div className={styles["p-item"]}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </i>
                <p>
                  can upload 10 images, 10 pdfs to each project and task as
                  attachments
                </p>
              </div>
              <div className={`${styles["p-item"]} ${styles["r-c"]}`}>
                <i>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </i>
                <p>No project analytics</p>
              </div>
            </div>
          </div>
          <div>
            <button
              className={`${styles["p-c-b"]} ${styles["p-b"]}`}
              planType="basic"
              onClick={(e) => handlePurchase(e)}
            >
              {loader2 ? <SpinnerSm /> : "PURCHASE"}
            </button>
          </div>
        </div>
      </div>
      {/* <div className={styles["pricing-note"]}>
        <p>
          Note: Currently, all users are receiving the benefits of the Advanced
          Plan as our payment system is in test mode. However, project creation
          is limited to 2 projects only.
        </p>
      </div> */}
    </div>
  );
}

function Questions() {
  const [number, setNumber] = useState(null);

  const qa = [
    {
      question: "What is this project management website?",
      answer:
        "Our project management website is a tool designed to help individuals and teams plan, track, and complete their projects efficiently. It includes features like task management, collaboration tools, and reporting to streamline your workflow.",
    },
    {
      question: "Can I upgrade from the Free Forever Plan?",
      answer:
        "Yes, you can upgrade to the Basic or Advanced Plan at any time to access more features and increase your project limits.",
    },
    {
      question: "How can I make a payment?",
      answer:
        "Payments can be made through our secure online payment system using major credit cards or other supported payment methods.",
    },

    {
      question: "Is there a trial period for the paid plans?",
      answer:
        "We do not offer a trial period, but you can start with the Free Forever Plan to get a feel for our platform. You can upgrade to a paid plan at any time to access additional features.",
    },

    {
      question: "Do you provide customer support?",
      answer:
        "Yes, we provide customer support. Users can contact us through our email for any assistance or inquiries. Whether you're on the Free Forever Plan, Basic Plan, or Advanced Plan, we're here to help you with any questions or issues you may have. For priority support, consider upgrading to our Advanced Plan.",
    },
  ];

  const toggleQues = (index) => {
    if (number === index) setNumber(null);
    else {
      setNumber(index);
    }
  };
  return (
    <div className={styles["qanda"]}>
      <h1>Frequently Asked Questions</h1>
      <div className={styles["q-items"]}>
        {qa.map((item, i) => (
          <div key={i} className={styles["q-item"]}>
            <div className={styles["ques"]} onClick={() => toggleQues(i)}>
              <p>{item.question}</p>
              <i>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className={`${styles["svg-rotate"]} ${
                    number === i ? styles["open"] : ""
                  }`}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m5 15 7-7 7 7"
                  />
                </svg>
              </i>
            </div>
            {number === i && <p className={styles["answer"]}>{item.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
