import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./TermsOfServices.module.css";
import { EMAIL } from "./../utility/constant";

const CONTACT_NUMBER = "+91-7905194692";
const OPERATING_ADDRESS = "Teliyarganj, Praygraj (211004) uttar pradesh India.";

function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <PolicyContent />
      <Footer />
    </div>
  );
}

function PolicyContent() {
  return (
    <div className={styles.policy}>
      <div className={styles["h-t"]}>
        <h1>Refund Policy</h1>
        <p>Last updated November 2024</p>
      </div>
      <div className={styles["agreement"]}>
        <p>
          At <b>ProzCollab</b>, we value your satisfaction and strive to provide
          high-quality services. Our Refund Policy outlines the conditions and
          process for refunds or cancellations.
        </p>
        <div className={styles["p-p-l"]}>
          <div className={styles["p-item"]}>
            <h2>Eligibility for Refund</h2>
            <p>
              Refunds are applicable for the subscription plans purchased
              through our platform under the following conditions:
            </p>
            <ul className={styles["ul-padding"]}>
              <li>
                The refund request is made within 7 days of the initial
                subscription purchase.
              </li>
              <li>
                Refunds are not applicable for partial usage or after the
                subscription has been extensively used.
              </li>
              <li>
                In case of a technical issue, users must report the problem
                immediately and allow our team reasonable time to resolve it.
              </li>
            </ul>
          </div>

          <div className={styles["p-item"]}>
            <h2>Refund Process</h2>
            <p>
              To initiate a refund, users must contact us at <b>{EMAIL}</b> or
              call our customer support at <b>{CONTACT_NUMBER}</b>. Refund
              requests will be processed within 5-7 working days of approval.
              The credited amount will be refunded to the original payment
              method or bank account.
            </p>
          </div>

          <div className={styles["p-item"]}>
            <h2>Cancellation Policy</h2>
            <p>
              Users can cancel their subscription at any time. Cancellation will
              stop future recurring charges but does not guarantee a refund for
              the remaining duration of the current subscription period.
            </p>
          </div>

          <div className={styles["p-item"]}>
            <h2>Pricing Information</h2>
            <p>
              All prices on the platform are listed in INR. Taxes and additional
              fees (if applicable) will be displayed at the time of checkout.
            </p>
          </div>

          <div className={styles["p-item"]}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this Refund Policy,
              please contact us at:
            </p>
            <p>
              Email: <b>{EMAIL}</b>
            </p>
            <p>
              Phone: <b>{CONTACT_NUMBER}</b>
            </p>
            <p>
              Address: <b>{OPERATING_ADDRESS}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
