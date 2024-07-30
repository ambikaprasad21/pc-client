import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import Navmenu from "./Navmenu";
import styles from "./Header.module.css";
function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <Navmenu />
      <AuthButtons />
    </div>
  );
}

export default Header;
