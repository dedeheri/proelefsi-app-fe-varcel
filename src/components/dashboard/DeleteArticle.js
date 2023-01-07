import React, { useState } from "react";
import Modal from "./Modal";

function DeleteArticle({ onShow, onClose, children }) {
  return (
    <>
      {children}

      {/* modal deleted */}
      <Modal onShow={onShow} onClose={onClose} label={"Hapus"}></Modal>
    </>
  );
}

export default DeleteArticle;
