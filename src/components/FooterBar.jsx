import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import styles from "../styles/FooterBar.module.css";

const FooterBar = () => {
    return (
        <Navbar
        //   expanded={expanded}
          className={styles.FooterBar}
        //   expand="md"
          fixed="bottom"
        >
          <Container>
Contact us:

          </Container>
        </Navbar>
      );

}

export default FooterBar;