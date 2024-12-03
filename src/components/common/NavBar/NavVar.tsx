// import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
// import { OpenModalContext } from "../../context/OpenModalContext.tsx";
import { classes } from "@/common_utils/classes/classes";

import styles from "./navbar.module.css";

export type Props = {
  isSticky?: boolean;
};

const Navbar = ({ isSticky = false }: Props) => {
  const navigate = useNavigate();
  //   const { setIsOpen } = useContext(OpenModalContext);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <nav
      className={classes(styles.navContainer, styles.lightTheme, {
        [styles.relativeNavContainer]: !isSticky,
        [styles.stickyNavContainer]: isSticky,
      })}
    >
      <div className={styles.navResponsive}>
        <div className={styles.logoContainer}>
          <Button type="text" ghost onClick={handleClick}>
            Logo
          </Button>
        </div>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Button
              ghost
              onClick={() => {
                // setIsOpen(true);
              }}
            >
              Login
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
