import React, { useEffect, useState } from "react";
import { Button, Password, Proccess } from "../../components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { requestResetPassword, requestVerifyToken } from "../../action/account";
import Expired from "./Expired";
import Container from "../../components/auth/Container";

function Reset() {
  const { search } = useLocation();

  const { t } = useTranslation();
  const [verify, setVerify] = useState({
    loading: true,
    error: false,
    message: "",
  });
  const [state, setState] = useState({
    fetching: false,
    message: {
      error: "",
      validation: "",
      success: "",
    },
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    requestVerifyToken(setVerify, search);
  }, [search]);

  function handleChange(e) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    await requestResetPassword(setState, search, state);
  }

  if (verify.error) {
    return <Expired message={verify.message} />;
  }

  return (
    <Container onSubmit={handleOnSubmit}>
      <Password
        placeholder={t("AUTH.PASSWORD")}
        name="password"
        onChange={handleChange}
        error={state?.message?.validation?.password?.message}
      />
      <Password
        placeholder={t("AUTH.REPEAT_PASSWORD")}
        name="repeatPassword"
        onChange={handleChange}
        error={state?.message?.validation?.repeatPassword?.message}
      />

      {state.fetching ? <Proccess /> : <Button label={t("AUTH.SEND")} />}
    </Container>
  );
}

export default Reset;
