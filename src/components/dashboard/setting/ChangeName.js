import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { requestChangeName } from "../../../action/user";
import { getUser } from "../../../constants/action";
import Button from "../../init/Button";
import Input from "../../init/Input";
import OtherButton from "../../init/OtherButton";
import Proccess from "../../init/Proccess";

function ChangeName() {
  const { t } = useTranslation();
  const [changeName, setChangeName] = useState(false);

  const [editFullName, setEditFullName] = useState({
    fetching: false,
    fullName: "",
    success: false,
    error: false,
    message: {
      error: "",
      validation: "",
      success: "",
    },
  });

  function handleOnChangeFullName(e) {
    setEditFullName((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.profileUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setEditFullName((prev) => ({ ...prev, fullName: data?.fullname }));
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    requestChangeName(setEditFullName, editFullName);
  }

  function handleCloseChangeName() {
    setChangeName(false);
    setEditFullName({
      fetching: false,
      fullName: "",
      success: false,
      error: false,
      message: {
        error: "",
        validation: "",
        success: "",
      },
    });
  }
  return (
    <div
      className={`px-4 py-2 ${
        changeName ? "dark:bg-[#111111] rounded-b-lg bg-gray-50 " : ""
      }`}
    >
      {changeName ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <h1 className="text-md font-medium">
            {t("SETTING.GENERAL.NAME.LABEL")}
          </h1>

          {loading ? (
            <div className="h-10 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md" />
          ) : (
            <Input
              defaultValue={data?.fullname || ""}
              error={editFullName?.message?.validation?.fullName?.message}
              name="fullName"
              onChange={(e) => handleOnChangeFullName(e)}
            />
          )}

          <div className="flex justify-end ">
            <div className="space-x-3 flex w-80">
              <OtherButton
                onClick={handleCloseChangeName}
                label={t("MODAL.CANCEL")}
              />
              {editFullName.fetching ? (
                <Proccess />
              ) : (
                <Button label={t("SETTING.GENERAL.NAME.BUTTON")} />
              )}
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="justify-between flex ">
            <h1 className="text-md font-medium">
              {t("SETTING.GENERAL.NAME.LABEL")}
            </h1>
            <button
              className="text-md text-[#2374E1]"
              onClick={() => setChangeName(true)}
            >
              Edit
            </button>
          </div>
          {loading ? (
            <div className="h-5 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md animate-pulse" />
          ) : (
            <h1 className="text-md ">{data?.fullname}</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default ChangeName;
