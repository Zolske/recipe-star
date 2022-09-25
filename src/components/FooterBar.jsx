import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import styles from "../styles/FooterBar.module.css";
import { OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";

const FooterBar = () => {
  return (
    <Navbar
      className={styles.FooterBar}
      fixed="bottom"
    >
      <Container>
          {/* facebook ############################################################ */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Click the link to follow us on Facebook!</Tooltip>}
          >
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="open a new page which leads to facebook"
              href='https://www.facebook.com/'>
              <i class="fa-brands fa-square-facebook"></i>
            </a>
          </OverlayTrigger>
          {/* instagram ############################################################ */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Click the link to follow us on Instagram!</Tooltip>}
          >
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="open a new page which leads to instagram"
              href='https://www.instagram.com/'>
              <i class="fa-brands fa-square-instagram"></i>
            </a>
          </OverlayTrigger>
          {/* twitter ############################################################ */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Click the link to follow us on Twitter!</Tooltip>}
          >
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="open a new page which leads to twitter"
              href='https://www.twitter.com/'>
              <i class="fa-brands fa-square-twitter"></i>
            </a>
          </OverlayTrigger>
          {/* email ############################################################ */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Write a email to the Developer.</Tooltip>}
          >
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="open your email app to write a email to the Developer"
              href='mailto:zoltan.the.kepes@gmail.com'>
              <i class="fa-solid fa-envelope"></i>
            </a>
          </OverlayTrigger>

      </Container>
    </Navbar>
  );

}

export default FooterBar;