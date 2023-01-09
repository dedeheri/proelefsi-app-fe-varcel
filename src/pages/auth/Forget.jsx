import React, { useState } from "react";
import { requestForgetPassword } from "../../action/account";
import { Button, Input, Proccess } from "../../components";
import { useTranslation } from "react-i18next";
import Container from "../../components/auth/Container";

function Forget() {
  const { t } = useTranslation();
  const [state, setState] = useState({
    fetching: false,
    message: {
      error: "",
      validation: "",
      success: "",
    },
    email: "",
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
    await requestForgetPassword(setState, state.email);
  }
  return (
    <Container onSubmit={handleOnSubmit}>
      <h1 className="font-medium leading-5">{t("AUTH.FORGET_LABEL_EMAIL")}</h1>
      <Input
        placeholder={"Email"}
        name="email"
        onChange={handleChange}
        error={
          state?.message?.validation?.email?.message || state?.message?.error
        }
      />

      {state.fetching ? <Proccess /> : <Button label={t("AUTH.SEND")} />}
    </Container>
  );
}

export default Forget;
