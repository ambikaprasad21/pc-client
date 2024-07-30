import { Link } from "react-router-dom";
import styles from "./Avatar.module.css";

const Avatar = ({ src, size, name }) => {
  const getInitials = (name) => {
    const names = name?.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <div className={` ${styles[size]} ${styles.avatar}`}>
      {src ? (
        <img
          src={src}
          alt="user profile picture"
          className={`${styles["avatar-img"]}`}
        />
      ) : (
        <div className={`${styles["avatar-initials"]}`}>
          {name ? getInitials(name) : "?"}
        </div>
      )}
    </div>
  );
};

export default Avatar;
