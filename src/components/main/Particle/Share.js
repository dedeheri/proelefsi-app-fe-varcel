import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { LinkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getAllCookies } from "../../../utils/Cookie";
import { useTranslation } from "react-i18next";
import { FacebookButton } from "react-social";
import toaster from "../../../utils/toaster";
// image
import { facebookDark, facebookLight } from "../../../assets/image";
import ReactTooltip from "react-tooltip";

function Share({ result }) {
  const cookie = getAllCookies();
  const { t } = useTranslation();

  const handleCopyLink = () => {
    toaster("success", t("ARTICLE.COPY_LINK"));
  };

  return (
    <Menu as="div" className="relative  inline-block  ">
      <div>
        <ReactTooltip place="bottom" style={"dark"} effect="solid" />
        <Menu.Button
          data-tip="Bagikan"
          className=" dark:text-gray-400 duration-300 text-[#5E5E5E] hover:text-black dark:hover:text-white "
        >
          <ShareIcon className="w-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 font-medium  top-11 right-0 w-44 bg-white dark:bg-[#242526] rounded-md border dark:border-[#3A3B3C]">
          <div className="px-2 py-2">
            <Menu.Item>
              <div className="flex">
                <CopyToClipboard text={result.url.shortLink}>
                  <div
                    onClick={handleCopyLink}
                    className="hover:dark:bg-[#3A3B3C] hover:bg-gray-100 p-1 cursor-pointer flex w-full items-center rounded-md space-x-2"
                  >
                    <LinkIcon className="w-5 h-5" />
                    <h1>{t("ARTICLE.ADD.DROPDOWN.COPY")}</h1>
                  </div>
                </CopyToClipboard>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="hover:dark:bg-[#3A3B3C] hover:bg-gray-100 p-1 cursor-pointer flex w-full items-center rounded-md space-x-2 ">
                <FacebookButton
                  url={result.url.shortLink}
                  appId={5716591165085732}
                >
                  <div className="flex items-center space-x-3">
                    {cookie.theme === "dark" ? (
                      <img
                        alt="twitter"
                        src={facebookLight}
                        className="w-4 h-5"
                      />
                    ) : (
                      <img
                        alt="twitter"
                        src={facebookDark}
                        className="w-4 h-5"
                      />
                    )}

                    <h1>Facebook</h1>
                  </div>
                </FacebookButton>
              </div>
            </Menu.Item>
            {/* <Menu.Item>
              <div className="hover:dark:bg-[#3A3B3C] hover:bg-gray-100 p-1 cursor-pointer flex w-full items-center rounded-md space-x-2 ">
                <TwitterBotton url={result.url.shortLink}>
                  <div className="flex items-center space-x-2">
                    <img
                      alt="twitter"
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
                      }
                      className="w-5 h-5"
                    />
                    <h1>Twitter</h1>
                  </div>
                </TwitterBotton>
              </div>
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Share;
