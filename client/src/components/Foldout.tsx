import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Foldout(props: {
  content: JSX.Element | null;
  title: string;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <div className="relative z-10 overflow-y-auto">
        <div className="fixed top-[4.66rem] h-full right-0 flex max-w-full pl-10">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col flex-a overflow-y-scroll bg-gray-900 shadow-xl">
                <div className="sticky top-0 z-200 bg-gray-700 py-4 h-10 rounded-bl-full px-6 border-b border-b-gray-900">
                  <div className="flex items-center justify-between h-full">
                    <div className=" text-white font-bold">{props.title}</div>
                    <button
                      type="button"
                      className="rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => props.onClose()}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <div className="my-6 mb-[6.66rem] flex-1 px-4 sm:px-6">
                  {props.content}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  );
}
