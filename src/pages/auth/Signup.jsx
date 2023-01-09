import { useEffect, useState } from "react";

// compontens
import { Input, Button, Password, Image, Proccess } from "../../components";
import Container from "../../components/auth/Container";
// translate
import { useTranslation } from "react-i18next";
// router
import { Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import signupAction from "../../constants/action/auth/action.signup";
import * as actionType from "../../constants/actiontypes/auth";

function Signup() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { message, validation, fetching } = useSelector(
    (state) => state.signUpAccount
  );
  const [state, setState] = useState({
    image_url: "",
    image_url_priview: "",
    fullname: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", state.fullname);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("image_url", state.image_url);
    dispatch(signupAction(formData));
  }

  useEffect(() => {
    return () => dispatch({ type: actionType.CLEAR_SIGNUP_ACCOUNT });
  }, [dispatch]);

  return (
    <Container title={t("AUTH.SIGNUP")}>
      <form className="space-y-3" onSubmit={handleOnSubmit}>
        <Image
          label={t("AUTH.ADD_AVATAR")}
          state={setState}
          preview={state.image_url_priview}
          error={validation?.image_url?.message || message?.avatar}
        />
        <Input
          error={validation?.fullname?.message}
          placeholder={t("AUTH.FULLNAME")}
          type={"text"}
          name="fullname"
          onChange={handleChange}
        />
        <Input
          error={validation?.email?.message || message?.email}
          placeholder={"Email"}
          type={"text"}
          name="email"
          onChange={handleChange}
        />
        <Password
          placeholder={t("AUTH.PASSWORD")}
          name="password"
          onChange={handleChange}
          error={validation?.password?.message}
        />
        {fetching ? <Proccess /> : <Button label={t("AUTH.SIGNUP")} />}
      </form>
      {/* signin */}
      <div className="flex justify-between items-center space-x-3">
        <div className="border-t w-full dark:border-[#353535] " />
        <h1 className="font-medium text-sm w-full whitespace-nowrap">
          {t("AUTH.SIGNIN_LABEL")}
        </h1>
        <div className="border-t  w-full dark:border-[#353535] " />
      </div>

      <Link
        to={"/account/signin"}
        className="font-medium cursor-pointer text-md border w-full h-10 md:h-11 flex items-center justify-center rounded-md hover:bg-gray-100 duration-300 space-x-3 dark:border-[#353535] dark:hover:bg-[#353535]"
      >
        <h1>{t("AUTH.SIGNIN")}</h1>
      </Link>

      <p className="font-medium text-sm leading-5">
        {t("AUTH.PRIVACY_LABEL")}{" "}
        <span className="text-blue-500"> {t("AUTH.CONDITION")}</span>{" "}
        {t("AUTH.AND")}{" "}
        <span className="text-blue-500"> {t("AUTH.OURTERMS")}</span>
      </p>
    </Container>
  );
}

export default Signup;
