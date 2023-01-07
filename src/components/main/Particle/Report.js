import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../../../constants/action/main";
import { REPORT_MODAL } from "../../../constants/actiontypes/other";

// utils
import { getAllCookies } from "../../../utils/Cookie";
import Button from "../../init/Button";
import Proccess from "../../init/Proccess";

function Report() {
  const cookie = getAllCookies();

  // redux
  const dispatch = useDispatch();
  const { report } = useSelector((state) => state.reportModalRedux);
  const { error, fetching, message } = useSelector((state) => state.report);

  function closeModal() {
    dispatch({ type: REPORT_MODAL, payload: false });
  }

  const reportData = [
    {
      id: 1,
      data: "Sara",
    },
    {
      id: 2,
      data: "Controversy",
    },
    {
      id: 3,
      data: "Racist",
    },
    {
      id: 4,
      data: "Violence",
    },
    {
      id: 5,
      data: "Offend Organizations",
    },
  ];

  // add
  const [addReportArticle, setAddReportArticle] = useState({
    problem: "",
    comments: "",
  });

  const [activeOncClickReport, setActiveOnClickReport] = useState(null);

  function onClickReport(id, value) {
    setActiveOnClickReport(id);
    setAddReportArticle((prev) => ({
      ...prev,
      problem: value,
    }));
  }
  function onChangeReport(e) {
    setAddReportArticle((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmitReport(e) {
    e.preventDefault();
    dispatch(
      addReport(addReportArticle.problem, addReportArticle.comments, report.id)
    );
  }

  return (
    <Transition appear show={report.modal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed right-0 left-0 top-40  overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-xl transform rounded-2xl  text-left align-middle border shadow-xl transition-all  ${
                  cookie.theme === "dark"
                    ? "bg-[#242526] border-[#353535]"
                    : "bg-white"
                } `}
              >
                <div
                  className={`p-9 e space-y-5 md:space-y-6 ${
                    cookie.theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <h1 className="font-medium text-lg">
                    Report <span className="italic">"{report.data}"</span>
                  </h1>

                  <div className="space-y-10">
                    <div className="space-y-3">
                      <h1>What's the problem?</h1>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {reportData.map((data, index) => (
                          <button
                            onClick={() => onClickReport(data.id, data.data)}
                            key={index}
                            className={`border w-auto  font-medium py-2 rounded-md duration-300 ${
                              cookie.theme === "dark"
                                ? ` border-[#353535] ${
                                    activeOncClickReport === data.id
                                      ? "bg-[#2374e1]"
                                      : " hover:bg-[#333232]"
                                  }`
                                : ` ${
                                    activeOncClickReport === data.id
                                      ? "bg-[#2374e1] text-white"
                                      : "hover:bg-gray-100"
                                  }`
                            }`}
                          >
                            <h1 className=" whitespace-nowrap">{data.data}</h1>
                          </button>
                        ))}
                      </div>

                      {error && (
                        <h1 className="text-red-500 font-medium italic">
                          {message}
                        </h1>
                      )}
                    </div>

                    {/* comments */}
                    <div className="space-y-3">
                      <h1>Optional</h1>
                      <div
                        className={`border rounded-md ${
                          cookie.theme === "dark" ? "border-[#353535]" : ""
                        }`}
                      >
                        <textarea
                          name="comments"
                          onChange={onChangeReport}
                          className="w-full bg-transparent outline-none p-2 "
                          rows={4}
                          placeholder="Any comments, or suggestions?"
                        />
                      </div>
                    </div>

                    {/* button */}
                    <div className="flex space-x-3">
                      <div
                        onClick={closeModal}
                        className={`font-medium cursor-pointer text-md border w-full  h-10 md:h-11 flex items-center justify-center rounded-md  duration-300 space-x-3   ${
                          cookie.theme === "dark"
                            ? "border-[#353535] text-white hover:bg-[#353535]"
                            : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        <h1 className="font-medium text-sm w-full whitespace-nowrap flex justify-center">
                          Cancel
                        </h1>
                      </div>

                      {fetching ? (
                        <Proccess />
                      ) : (
                        <Button label={"Send"} onClick={onSubmitReport} />
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Report;
