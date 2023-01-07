import React, { useState } from "react";

import { requestSendOTP } from "../../action/account";
// compontens
import { Input, Button, Proccess } from "../../components";
import ResendOTP from "../../components/ResendOTP";
import Container from "../../components/auth/Container";
import { useTranslation } from "react-i18next";
function Otp() {
  const { t } = useTranslation();
  const [state, setState] = useState({
    fetching: false,
    otp: "",
    success: false,
    message: {
      error: "",
      validation: "",
      success: "",
    },
  });

  const [reSend, setResend] = useState({
    fetching: false,
    message: "",
    error: "",
  });

  function handleChange(e) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      remember_me: e.target.checked,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    await requestSendOTP(setState, state.otp);
  }

  return (
    <Container onSubmit={handleOnSubmit}>
      <Input
        placeholder={"OTP"}
        name="otp"
        onChange={handleChange}
        error={state?.message?.validation?.otp?.message}
      />

      <ResendOTP reSend={reSend} setResend={setResend} />

      {state.fetching ? <Proccess /> : <Button label={t("AUTH.SEND")} />}
    </Container>
  );
}

export default Otp;
