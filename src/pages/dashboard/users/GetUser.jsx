import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// components
import {
  Container,
  FilterUser,
  Page,
  Search,
  SkeletonTableUser,
  TableUser,
  Message,
} from "../../../components";
import { userAction } from "../../../constants/action/dashboard";
import { getAllCookies } from "../../../utils/Cookie";
import DeleteUser from "./DeleteUser";

function GetUser() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const cookie = getAllCookies();
  const dispatch = useDispatch();

  // state
  const [perPage, setPerPage] = useState(0);

  const {
    user: { message, data, error, loading },
  } = useSelector((state) => state.userReducer);
  // fetching user
  useEffect(() => {
    dispatch(userAction(search));
  }, [dispatch, search, cookie.i18next, perPage]);

  return (
    <Container title={t("SIDEBAR.USER")}>
      <div className="px-5 md:px-7 pt-4 md:pt-6 lg:pt-8 pb-3 md:pb-2 lg:pb-7">
        <h1 className="font-medium text-xl md:text-2xl lg:text-3xl ">
          {t("SIDEBAR.USER")}
        </h1>
      </div>

      {/* header state */}
      <div className="border-b dark:border-[#353535] px-4 flex items-center justify-between">
        <div className="flex space-x-4 items-center my-2">
          <FilterUser />
          {/* search */}
          <Search />
          {/* filter */}
        </div>
      </div>

      {/* loading */}
      {loading ? (
        <SkeletonTableUser />
      ) : error ? (
        <Message message={message} />
      ) : (
        <>
          <TableUser data={data.result} page={data.page} perPage={setPerPage} />
          {/* pagination */}
          <Page page={data.page} perPage={setPerPage} cookieName={"ppu"} />

          <DeleteUser />
        </>
      )}
    </Container>
  );
}

export default GetUser;
