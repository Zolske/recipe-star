import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";
import appStyles from "../App.module.css";

// const Asset = ({ spinner, src, message }) => {
  const Asset = ({ spinner, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      <i class="fa-solid fa-upload fa-10x"></i>
      {message && <p className="mt-4"><span className={appStyles.text_cursive}>{message}</span></p>}
    </div>
  );
};

export default Asset;