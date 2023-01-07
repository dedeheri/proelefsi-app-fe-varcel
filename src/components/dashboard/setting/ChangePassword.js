import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { requestChangePassword } from "../../../action/user";
import Button from "../../init/Button";
import OtherButton from "../../init/OtherButton";
import Password from "../../init/Password";
import Proccess from "../../init/Proccess";

function ChangePassword() {
  const { t } = useTranslation();
  const [changePassword, setChangePassword] = useState(false);

  const [editPassword, setEditPassword] = useState({
    fetching: false,
    currentPassword: "",
    newPassword: "",
    reTypePassword: "",
    success: false,
    error: false,
    message: {
      error: "",
      validation: "",
      success: "",
    },
  });

  function handleOnChangePassword(e) {
    setEditPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleChangeName(e) {
    e.preventDefault();
    requestChangePassword(setEditPassword, editPassword);
  }

  function handleCloseChangePassword() {
    setChangePassword(false);
    setEditPassword({
      fetching: false,
      currentPassword: "",
      newPassword: "",
      reTypePassword: "",
      success: false,
      error: false,
      message: "",
    });
  }

  return (
    <div
      className={`px-4 py-2 ${
        changePassword ? "dark:bg-[#111111] bg-gray-50 rounded-b-lg" : ""
      }`}
    >
      <div className="space-y-1 ">
        {changePassword ? (
          <div className="space-y-5">
            <h1 className="text-md font-medium">
              {t("SETTING.GENERAL.PASSWORD.LABEL")}
            </h1>

            <form onSubmit={handleChangeName}>
              <div className="space-y-2">
                <Password
                  error={
                    editPassword?.message?.validation?.currentPassword
                      ?.message ||
                    editPassword?.message?.error?.current_password
                  }
                  placeholder={"Current Password"}
                  name="currentPassword"
                  onChange={(e) => handleOnChangePassword(e)}
                />
                <Password
                  error={
                    editPassword?.message?.validation?.newPassword?.message
                  }
                  placeholder={"New Password"}
                  name="newPassword"
                  onChange={(e) => handleOnChangePassword(e)}
                />
                <Password
                  error={
                    editPassword?.message?.validation?.retypePassword?.message
                  }
                  placeholder={"Retype New Password"}
                  name="reTypePassword"
                  onChange={(e) => handleOnChangePassword(e)}
                />
              </div>

              <div className="flex justify-end pt-7">
                <div className="space-x-3 flex w-80">
                  <OtherButton
                    onClick={handleCloseChangePassword}
                    label={t("MODAL.CANCEL")}
                  />
                  {editPassword.fetching ? (
                    <Proccess />
                  ) : (
                    <Button label={t("SETTING.GENERAL.PASSWORD.BUTTON")} />
                  )}
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="justify-between flex ">
              <h1 className="text-lg font-medium">
                {t("SETTING.GENERAL.PASSWORD.LABEL")}
              </h1>
              <button
                className="text-md text-[#2374E1]"
                onClick={() => setChangePassword(true)}
              >
                Edit
              </button>
            </div>
            <h1 className="text-md">
              {t("SETTING.GENERAL.PASSWORD.PASSWORD_TEXT")}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
