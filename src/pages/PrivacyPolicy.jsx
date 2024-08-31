import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./PrivacyPolicy.module.css";
import { EMAIL } from "./../utility/constant";

function PrivacyPolicy() {
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
        <h1>Privacy Policy</h1>
        <p>Last updated July 2024</p>
      </div>
      <div className={styles["agreement"]}>
        <p>
          <b>ProzCollab</b> is committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and disclose information
          about you when you use our project management application.
        </p>
        <div className={styles["p-p-l"]}>
          <div className={styles["p-item"]}>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, update your profile, create or manage
              projects, add members, or contact us for support.
            </p>
          </div>

          <div className={styles["p-item"]}>
            <h2>Use of Information</h2>
            <p>
              We use the information we collect to:
              <ul className={styles["ul-padding"]}>
                <li>Provide, maintain, and improve the Service.</li>
                <li>
                  Process transactions and send related information, such as
                  purchase confirmations and invoices.
                </li>
                <li>
                  Respond to your comments, questions, and requests, and provide
                  customer service.
                </li>
                <li>
                  Send you technical notices, updates, security alerts, and
                  support and administrative messages.
                </li>
                <li>
                  Communicate with you about products, services, offers,
                  promotions, and events.
                </li>
              </ul>
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Sharing of Information</h2>
            <p>
              We do not share or sell your personal information to third
              parties, except as described in this Privacy Policy. We may share
              information with:
              <ul className={styles["ul-padding"]}>
                <li>
                  Service providers who need access to such information to carry
                  out work on our behalf.
                </li>
                <li>
                  If required by law or in response to a legal process, such as
                  a court order or subpoena.
                </li>
              </ul>
            </p>
          </div>

          <div className={styles["p-item"]}>
            <h2>Security</h2>
            <p>
              We take reasonable measures to help protect information about you
              from loss, theft, misuse, and unauthorized access, disclosure,
              alteration, and destruction.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary
              to provide you with the Service or as otherwise set forth in this
              Privacy Policy. We will also retain and use your information to
              comply with our legal obligations, resolve disputes, and enforce
              our agreements.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              changes, we will notify you by revising the date at the top of the
              policy and, in some cases, we may provide additional notice.
            </p>
          </div>
          <div className={styles["p-item"]}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Privacey Policy, please
              contact us at <b>{EMAIL}</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
