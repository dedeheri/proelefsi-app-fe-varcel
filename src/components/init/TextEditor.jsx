import { useEffect } from "react";

import base from "../../api/base";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getAllCookies } from "../../utils/Cookie";
import { EditorState } from "draft-js";

function TextEditor({ state, value, error }) {
  const cookie = getAllCookies();

  const editorStateChange = (editorState) => {
    state((prev) => ({ ...prev, content: EditorState.createEmpty() }));
    state((prev) => ({ ...prev, content: editorState }));
  };

  function uploadImageCallBack(file) {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("image_url", file);
      await base.post("api/v1/article/image_temp", formData).then(
        (responseImage) => {
          resolve({ data: { link: responseImage.data.data.image_content } });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  useEffect(() => {
    const toolbar = document.getElementsByClassName("rdw-editor-toolbar");
    const dropdownoption = document.getElementsByClassName(
      "rdw-dropdown-wrapper"
    );
    const wrapper = document.getElementsByClassName("rdw-option-wrapper");
    const bodyWrapper = document.getElementsByClassName("rdw-editor-main ");

    if (cookie.theme === "dark") {
      for (let i = 0; i < dropdownoption.length; i++) {
        dropdownoption[i].style.background = "#242323";
        dropdownoption[i].style.border = " 1px solid #353535";
      }

      for (let i = 0; i < wrapper.length; i++) {
        wrapper[i].style.background = "";
        wrapper[i].style.border = " 1px solid #353535";
      }

      for (let i = 0; i < toolbar.length; i++) {
        toolbar[i].style.backgroundColor = "black";
        toolbar[i].style.border = " 1px solid #353535";
      }

      for (let i = 0; i < bodyWrapper.length; i++) {
        bodyWrapper[i].style.backgroundColor = "black";
        bodyWrapper[i].style.color = "white";
      }
    }
  }, [cookie.theme]);

  return (
    <div className="space-y-2">
      <Editor
        toolbarClassName="sticky top-[6rem] border-none z-40 flex !justify-center"
        wrapperClassName={`dark:shadow-md bg-white shadow-md dark:shadow-gray-800 rounded-md border dark:border-[#353535] ${
          error ? "border-red-500" : ""
        }`}
        onEditorStateChange={editorStateChange}
        editorState={value}
        placeholder="Tell your story"
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
          },
        }}
      />

      {error && <h1 className="font-medium text-red-500">{error}</h1>}
    </div>
  );
}

export default TextEditor;
