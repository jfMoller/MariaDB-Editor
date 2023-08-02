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
      <div className="relative z-10">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="bg-gray-900 py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="text-xl text-white">{props.title}</div>

                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="rounded-md bg-brown-700 text-grenn-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                  <div className="mt-1">
                    <p className="text-sm text-green-100"></p>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
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
