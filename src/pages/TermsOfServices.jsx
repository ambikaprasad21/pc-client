import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./TermsOfServices.module.css";
import Email from "./../utility/constant";

function TermsOfServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <Data />
      <Footer />
    </div>
  );
}

function Data() {
  return (
    <div className={styles.data}>
      <div className={styles["h-t"]}>
        <h1>Terms of services</h1>
        <p>Last updated July 2024</p>
      </div>
      <div className={styles["agreement"]}>
        <p>
          By accessing or using <b>ProzCollab</b>, you agree to comply with and
          be bound by these Terms of Service. If you do not agree to these
          terms, you should not use the Service.
        </p>
        <div className={styles["p-p-l"]}>
          <div className={styles["p-item"]}>
            <h2>Description of service</h2>
            <p>
              <b>ProzCollab</b> is a project management platform that allows
              users to create projects, download project summaries, add members
              to projects, and add tasks to projects and related features for
              managing projects. The Service includes a free tier with a limit
              of two project creations. Users must subscribe to a paid plan to
              create more than two projects and to access project analytics.
            </p>
          </div>

          <div className={styles["p-item"]}>
            <h2>User Account</h2>
            <p>
              You must create an account to use the Service. You are responsible
              for maintaining the confidentiality of your account information
              and for all activities that occur under your account. You agree to
              notify us immediately of any unauthorized use of your account.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Payment and Subscription</h2>
            <p>
              The Service offers both free and paid plans. The free plan allows
              for the creation of up to two projects. To create more than two
              projects and access additional features such as project analytics,
              you must subscribe to a paid plan. Subscription fees are billed on
              a recurring basis as specified at the time of purchase.
            </p>
          </div>

          <div className={styles["p-item"]}>
            <h2>User Conduct</h2>
            <p>
              You agree to use the Service only for lawful purposes and in
              accordance with these Terms of Service. You must not:
              <ul className={styles["ul-padding"]}>
                <li>
                  Use the Service in any way that violates any applicable
                  federal, state, local, or international law or regulation.
                </li>
                <li>
                  Engage in any activity that could disable, overburden, damage,
                  or impair the Service or interfere with any other party's use
                  of the Service.
                </li>
                <li>
                  Attempt to gain unauthorized access to the Service, other
                  accounts, computer systems, or networks connected to the
                  Service.
                </li>
              </ul>
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of <b>ProzCollab</b>{" "}
              and its licensors. The Service is protected by copyright,
              trademark, and other laws of both the United States and foreign
              countries.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, if you
              breach these Terms of Service. Upon termination, your right to use
              the Service will immediately cease.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall <b>ProzCollab</b>, its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your use of
              the Service.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed and construed in
              accordance with the laws of <b>INDIA</b>, without regard to its
              conflict of law provisions.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms of Service at any time. If a revision is material, we
              will provide at least 30 day's notice prior to any new terms
              taking effect. What constitutes a material change will be
              determined at our sole discretion.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at <b>{Email}</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServices;
