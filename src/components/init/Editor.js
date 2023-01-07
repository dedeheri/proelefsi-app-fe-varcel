import { createReactEditorJS } from "react-editor-js";

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

import base from "../../api/base";
import { getAllCookies } from "../../utils/Cookie";
import { useEffect } from "react";

const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  list: List,
  warning: Warning,
  code: Code,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            formData.append("image_url", file);
            await base.post("api/v1/article/image_temp", formData).then(
              (responseImage) => {
                resolve({
                  success: 1,
                  file: { url: responseImage.data.data.image_content },
                });
              },
              (error) => {
                reject(error);
              }
            );
          });
        },
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

const EditorJs = createReactEditorJS();

function Editor({ instanceRef, value, id }) {
  const cookie = getAllCookies();

  useEffect(() => {
    const popperOpened = document.getElementsByClassName("ce-popover");
    const popperOpenedSearch =
      document.getElementsByClassName("cdx-search-field");
    const toolbarPlus = document.getElementsByClassName("ce-toolbar__plus");
    const toolbarSetting = document.getElementsByClassName(
      "ce-toolbar__settings-btn"
    );
    const popperOpenedItem =
      document.getElementsByClassName("ce-popover__item");
    const popoverOpendIcon = document.getElementsByClassName(
      "ce-popover__item-icon"
    );
    const popperSetting = document.getElementsByClassName("ce-settings");
    const popperSettingButton = document.getElementsByClassName(
      "ce-settings__button"
    );

    const inlineToolbar = document.getElementsByClassName("ce-inline-toolbar");
    const inlineTool = document.getElementsByClassName("ce-inline-tool");

    if (cookie.theme === "dark") {
      // bg popper
      for (let i = 0; i < popperOpened.length; i++) {
        popperOpened[i].style.backgroundColor = "#19191a";
        popperOpened[i].style.border = "#353535";
      }
      for (let i = 0; i < inlineToolbar.length; i++) {
        inlineToolbar[i].style.backgroundColor = "#19191a";
        inlineToolbar[i].style.border = "#353535";
      }
      for (let i = 0; i < inlineTool.length; i++) {
        inlineTool[i].style.color = "white";
      }

      // hover bg popper
      for (let i = 0; i < popperOpenedItem.length; i++) {
        popperOpenedItem[i].onmouseover = function () {
          popperOpenedItem[i].style.backgroundColor = "#353535";
        };

        popperOpenedItem[i].onmouseout = function () {
          popperOpenedItem[i].style.backgroundColor = "#19191a";
        };
      }

      // pooper icons
      for (let i = 0; i < popoverOpendIcon.length; i++) {
        popoverOpendIcon[i].style.border = "1px solid #353535";
        popoverOpendIcon[i].style.backgroundColor = "black";
      }

      // search
      for (let i = 0; i < popperOpenedSearch.length; i++) {
        popperOpenedSearch[i].style.backgroundColor = "#353535";
      }

      // icons plus
      for (let i = 0; i < toolbarPlus.length; i++) {
        toolbarPlus[i].onmouseover = function () {
          toolbarPlus[i].style.backgroundColor = "#353535";
        };

        toolbarPlus[i].onmouseout = function () {
          toolbarPlus[i].style.backgroundColor = "black";
        };

        toolbarPlus[i].style.color = "white";
      }

      // icons setting
      for (let i = 0; i < toolbarSetting.length; i++) {
        toolbarSetting[i].onmouseover = function () {
          toolbarSetting[i].style.backgroundColor = "#353535";
        };

        toolbarSetting[i].onmouseout = function () {
          toolbarSetting[i].style.backgroundColor = "black";
        };

        toolbarSetting[i].style.color = "white";
      }

      // setting
      for (let i = 0; i < popperSetting.length; i++) {
        popperSetting[i].style.backgroundColor = "#19191a";
        popperSetting[i].style.border = "1px solid #353535";
      }
      // setting button
      for (let i = 0; i < popperSettingButton.length; i++) {
        popperSettingButton[i].style.color = "white";

        popperSettingButton[i].onmouseover = function () {
          popperSettingButton[i].style.backgroundColor = "#353535";
        };

        popperSettingButton[i].onmouseout = function () {
          popperSettingButton[i].style.backgroundColor = "#19191a";
        };
      }
    }
    for (let i = 0; i < inlineTool.length; i++) {
      inlineTool[i].onmouseover = function () {
        inlineTool[i].style.backgroundColor = "#353535";
      };

      inlineTool[i].onmouseout = function () {
        inlineTool[i].style.backgroundColor = "#19191a";
      };
    }
  }, [cookie, id]);

  return (
    <EditorJs
      defaultValue={value}
      tools={EDITOR_JS_TOOLS}
      onInitialize={(instance) => (instanceRef.current = instance)}
      placeholder="Tell your story"
    />
  );
}

export default Editor;
