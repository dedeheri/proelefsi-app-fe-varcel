import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

// compontens
import { Input, Button, Password, Proccess, Checkbox } from "../../components";
import Container from "../../components/auth/Container";
import { signInAction } from "../../constants/action";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  const { t } = useTranslation();
  const { fetching, validation, message } = useSelector(
    (state) => state.signInReducer
  );
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    remember_me: false,
    password: "",
  });

  function handleChange(e) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      remember_me: e.target.checked,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(signInAction(state));
  }

  return (
    <Container title={"AUTH.SIGNIN"} onSubmit={handleOnSubmit}>
      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <Input
          placeholder={"Email"}
          name="email"
          onChange={handleChange}
          error={validation?.email?.message || message?.email}
        />
        <Password
          placeholder={t("AUTH.PASSWORD")}
          name="password"
          onChange={handleChange}
          error={validation?.password?.message || message?.password}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label={t("AUTH.REMEMBER")}
            onChange={handleChange}
            defaultValue={state.remember_me}
          />

          <Link to={"/account/forget"}>
            <h1 className="text-sm font-medium text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white duration-300">
              {t("AUTH.FORGET")}
            </h1>
          </Link>
        </div>

        {fetching ? <Proccess /> : <Button label={t("AUTH.SIGNIN")} />}
      </form>

      {/* signup */}
      <div className="flex justify-between items-center space-x-3">
        <div className="border-t w-full dark:border-[#353535] " />
        <h1 className="font-medium text-sm w-full whitespace-nowrap">
          {t("AUTH.SIGNUP_LABEL")}
        </h1>
        <div className="border-t  w-full dark:border-[#353535] " />
      </div>

      <Link
        to={"/account/signup"}
        className="font-medium cursor-pointer text-md border w-full h-10 md:h-11 flex items-center justify-center rounded-md hover:bg-gray-100 duration-300 space-x-3 dark:border-[#353535] dark:hover:bg-[#353535]"
      >
        <h1>{t("AUTH.SIGNUP")}</h1>
      </Link>
    </Container>
  );
}

export default Signin;
