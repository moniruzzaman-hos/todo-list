import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { MdClose } from "react-icons/md";

function Modal(props) {
  const { isOpen, onClose, title, size, children, isLoading, modalID } = props;
  const [open, setOpen] = useState(isOpen);
  const ref = useRef(null);
  const cancelButtonRef = useRef();
  return (
    <Transition.Root static={true} show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={ref}
        onClose={() => {
          // setOpen(false);
          // onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 backdrop-blur-xs transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
              <Dialog.Panel className="transform rounded-md bg-white  text-left align-middle shadow-xl transition-all flex flex-col overflow-visible w-full max-w-3xl">
                <div className={``}>
                  <div className="flex h-12 justify-between items-center my-3 px-2">
                    <h2 className="text-xl  font-semibold">
                      {title ? title : "Modal"}
                    </h2>
                    <button
                      ref={cancelButtonRef}
                      className="text-lg p-2 border-2 border-opacity-10 hover:bg-slate-100 hover:border-opacity-700 border-gray-700 hover:border-2 rounded-lg text-red-500"
                      onClick={onClose}
                    >
                      <MdClose size={24} />
                    </button>
                  </div>
                  <hr />
                  <div className="p-4">{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
