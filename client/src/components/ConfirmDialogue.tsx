import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function ConfirmDialog(props: {
  visible: boolean;
  caption: string;
  color: string;
  description: string | JSX.Element | null;
  confirmButton: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const colorClass = `bg-${props.color}-600`;

  return (
    <Transition.Root show={props.visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={props.onCancel}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-25 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-5 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={
                      "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 " +
                      colorClass
                    }
                  >
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-white"
                    >
                      {props.caption}
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="text-sm text-gray-50">
                        {props.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-600 border-t border-gray-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  text={props.caption}
                  color={props.color}
                  className={"border border-gray-400 mb-3 sm:mb-0"}
                  handleClick={props.onConfirm}
                />
                <Button
                  text={"Cancel"}
                  color={"gray"}
                  className={"border border-gray-400"}
                  handleClick={props.onCancel}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
