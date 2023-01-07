import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../constants/action";
import Button from "../../init/Button";
import Input from "../../init/Input";
import Proccess from "../../init/Proccess";
import OtherButton from "../../init/OtherButton";
import { requestChangeEmail } from "../../../action/user";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ChangeEmail() {
  const { t } = useTranslation();
  const [changeEmail, setChangeEmail] = useState(false);

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.profileUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [editEmail, setEditEmail] = useState({
    fetching: false,
    email: "",
    success: false,
    error: false,
    message: {
      error: "",
      validation: "",
      success: "",
    },
  });
  function handleCloseChangeEmail() {
    setChangeEmail(false);
    setEditEmail({
      fetching: false,
      email: "",
      success: false,
      error: false,
      message: {
        error: "",
        validation: "",
        success: "",
      },
    });
  }

  // useEffect(() => {
  //   setEditEmail((prev) => ({ ...prev, email: data?.email }));
  // }, [data]);

  function handleOnChangeEmail(e) {
    setEditEmail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    requestChangeEmail(setEditEmail, editEmail);
  }

  console.log(editEmail);

  return (
    <div
      className={`px-4 py-2 ${
        changeEmail ? "dark:bg-[#111111] rounded-b-lg" : ""
      }`}
    >
      {editEmail?.success ? (
        <form onSubmit={handleSubmit}>
          <h1 className="text-md font-medium pb-3">OTP Verify</h1>

          {loading ? (
            <div className="h-10 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md" />
          ) : (
            <Input
              defaultValue={""}
              placeholder={"OTP"}
              error={editEmail?.message?.validation?.OTP?.message}
              name="otp"
            />
          )}

          <div className="pt-3 ">
            <div className="dark:bg-green-900 p-2 rounded-md">
              <h1 className="text-md font-medium">{editEmail.message}</h1>
            </div>
          </div>

          <div className="flex justify-end pt-7">
            <div className="space-x-3 flex w-80">
              <OtherButton
                label={t("MODAL.CANCEL")}
                onClick={handleCloseChangeEmail}
              />
              {false ? <Proccess /> : <Button label={"Send OTP"} />}
            </div>
          </div>
        </form>
      ) : changeEmail ? (
        <form onSubmit={handleSubmit}>
          <h1 className="text-md font-medium pb-3">Email</h1>

          {loading ? (
            <div className="h-10 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md" />
          ) : (
            <Input
              placeholder={"Email"}
              error={editEmail?.message?.validation?.email?.message}
              name="email"
              onChange={(e) => handleOnChangeEmail(e)}
            />
          )}

          <div className="flex justify-end pt-7">
            <div className="space-x-3 flex w-80">
              <OtherButton
                label={t("MODAL.CANCEL")}
                onClick={handleCloseChangeEmail}
              />
              {editEmail.fetching ? (
                <Proccess />
              ) : (
                <Button label={"Change Email"} />
              )}
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="justify-between flex ">
            <h1 className="text-md font-medium">Email</h1>
            <button
              className="text-md text-[#2374E1]"
              onClick={() => setChangeEmail(true)}
            >
              Edit
            </button>
          </div>
          {loading ? (
            <div className="h-5 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md animate-pulse" />
          ) : (
            <h1 className="text-md ">{data?.email}</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default ChangeEmail;
