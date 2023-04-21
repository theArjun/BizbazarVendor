import React, { useState } from "react";
import styles from "./AgreementModal.module.css";
import { Button, notification } from "antd";
import { handlelogin } from "../../utils/auth/auth";
import { useNavigate } from "react-router-dom";
const AgreementModal = ({ modalOpen, setModalOpen, data }) => {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    handlelogin(data);
    notification.success({ message: "Login successful!" });
    sessionStorage.setItem("first_login", true);
    setModalOpen(false);
    navigate("/");
  };
  const handleCancelAgreement = () => {
    setModalOpen(false);
  };
  return (
    <div id="agreementModal">
      <div id="modal" className={modalOpen ? styles.modal : styles.close_modal}>
        <div className={styles.modal_content}>
          <h2>Bizbazar Vendor Agreement</h2>
          <div className={styles.modal_content_body}>
            <p>
              Please read and accept the terms and conditions before proceeding.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              venenatis bibendum metus vitae convallis. Integer quis vestibulum
              massa. Ut egestas blandit sem, vel fermentum nisl vulputate nec.
              Sed vestibulum, ipsum eu vulputate aliquam, elit tellus tempor
              elit, in posuere odio enim eu nisl. Etiam posuere tortor nec enim
              posuere, id consectetur lectus vehicula. Integer congue felis sit
              amet tortor ullamcorper consectetur. Proin varius, risus in
              dapibus dignissim, mauris lacus congue mauris, nec dapibus orci
              neque ut ligula. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Duis venenatis bibendum metus vitae convallis.
              Integer quis vestibulum massa. Ut egestas blandit sem, vel
              fermentum nisl vulputate nec. Sed vestibulum, ipsum eu vulputate
              aliquam, elit tellus tempor elit, in posuere odio enim eu nisl.
              Etiam posuere tortor nec enim posuere, id consectetur lectus
              vehicula. Integer congue felis sit amet tortor ullamcorper
              consectetur. Proin varius, risus in dapibus dignissim, mauris
              lacus congue mauris, nec dapibus orci neque ut ligula. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Duis venenatis
              bibendum metus vitae convallis. Integer quis vestibulum massa. Ut
              egestas blandit sem, vel fermentum nisl vulputate nec. Sed
              vestibulum, ipsum eu vulputate aliquam, elit tellus tempor elit,
              in posuere odio enim eu nisl. Etiam posuere tortor nec enim
              posuere, id consectetur lectus vehicula. Integer congue felis sit
              amet tortor ullamcorper consectetur. Proin varius, risus in
              dapibus dignissim, mauris lacus congue mauris, nec dapibus orci
              neque ut ligula. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Duis venenatis bibendum metus vitae convallis.
              Integer quis vestibulum massa. Ut egestas blandit sem, vel
              fermentum nisl vulputate nec. Sed vestibulum, ipsum eu vulputate
              aliquam, elit tellus tempor elit, in posuere odio enim eu nisl.
              Etiam posuere tortor nec enim posuere, id consectetur lectus
              vehicula. Integer congue felis sit amet tortor ullamcorper
              consectetur. Proin varius, risus in dapibus dignissim, mauris
              lacus congue mauris, nec dapibus orci neque ut ligula.
            </p>
          </div>
          <div className={styles.footer_content}>
            <div className={styles.terms}>
              {" "}
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                name="terms"
                id="terms"
              />{" "}
              <span>
                I agree to <a href="">Terms and Conditions</a>
              </span>
            </div>
            <div className={styles.modal_buttons}>
              <Button
                type="primary"
                onClick={handleCancelAgreement}
                id="cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                disabled={!agree}
                onClick={handleSubmit}
                id="submit_button"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementModal;
