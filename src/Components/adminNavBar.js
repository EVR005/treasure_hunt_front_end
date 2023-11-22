import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "./begingame";
import Leaderboard from "./leaderboard";
import Dashboard from "./dashboard";
import SetPuzzle from "./set_puzzle";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Set Puzzle", href: "#", current: false },
  { name: "LeaderBoard", href: "#", current: false },
  //   { name: "Instructions", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];

// const navigation = [
//   { name: "Main Menu","component":<dummy/>},
//   { name: "LeaderBoard", href: "#", current: false },
//   { name: "Instructions", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [comp, setComp] = useState(<Dashboard />);

  const navigate = useNavigate();

  const setProps = (e) => {
    // localStorage.setItem(
    //   "comp_choose",
    //   JSON.stringify(e.target.getAttribute("comp_key"))
    // );
    // console.log(e.target);
    let comp_key = e.target.getAttribute("comp_key");
    if (comp_key == 0) setComp(<Dashboard />);
    else if (comp_key == 1) setComp(<SetPuzzle />);
    else if (comp_key == 2) setComp(<Leaderboard />);
    for (let i = 0; i < navigation.length; i++) {
      if (i == comp_key) navigation[i].current = true;
      else navigation[i].current = false;
    }
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  {/* <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div> */}
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item, k) => (
                        <a
                          key={item.name}
                          comp_key={k}
                          href={item.href}
                          onClick={setProps}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 border border-gray-400 border-2 rounded-full p-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-5 border border-gray-400 border-2 rounded-full p-2"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    <span className="sr-only">Sign Out</span>
                    <ArrowLeftOnRectangleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    ></ArrowLeftOnRectangleIcon>
                  </button>

                  {/* Profile dropdown */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item, k) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    comp_key={k}
                    onClick={setProps}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {comp}
    </div>
  );
}
