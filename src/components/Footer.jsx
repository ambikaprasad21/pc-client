import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styles from "./Footer.module.css";
import Logo from "./Logo";
import { useState } from "react";

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <>
      <div className={styles["footer"]}>
        <div className={styles["l-l"]}>
          <Logo />
          <div className={styles["links"]}>
            <div className={styles["p-l"]}>
              <Link to="/">Home</Link>
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                duration={500}
                className="mouse"
              >
                About
              </ScrollLink>
              <Link>Articles</Link>
              <ScrollLink
                to="pricing"
                spy={true}
                smooth={true}
                duration={500}
                className="mouse"
              >
                Pricing
              </ScrollLink>
            </div>
            <div className={styles["p-l"]}>
              <Link to={"/privacy-policy"}>Privacy policy</Link>
              <Link to={"/terms-of-services"}>Terms of services</Link>
            </div>
            <div className={styles["p-l"]}>
              <p>Contact Us</p>
              <p className={styles.email}>prozcollab.support@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={styles["social"]}>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
          </svg>
        </div>
      </div>

      <p className={styles["copyright"]}>
        © {year} ProzCollab. All rights reserved.
      </p>
    </>
  );
}

export default Footer;

<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
    clip-rule="evenodd"
  />
</svg>;

<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="currentColor"
  viewBox="0 0 24 24"
>
  <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
</svg>;
