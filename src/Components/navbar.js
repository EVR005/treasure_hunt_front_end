import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Profile from "./profile";
import MenuBar from "./begingame";
import Leaderboard from "./leaderboard";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Instructions from "./instructions";

const navigation = [
  { name: "Main Menu", href: "#", current: true },
  { name: "LeaderBoard", href: "#", current: false },
  { name: "Instructions", href: "#", current: false },
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
  const [comp, setComp] = useState(<MenuBar />);
  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = { id: JSON.parse(localStorage.getItem("player_id")) };

  const navigate = useNavigate();

  const setProps = (e) => {
    // localStorage.setItem(
    //   "comp_choose",
    //   JSON.stringify(e.target.getAttribute("comp_key"))
    // );
    // console.log(e.target);
    let comp_key = e.target.getAttribute("comp_key");
    if (comp_key == 0) setComp(<MenuBar visibility={true} />);
    else if (comp_key == 1) setComp(<Leaderboard />);
    else if (comp_key == 2) setComp(<Instructions />);
  };

  const loadProfile = async () => {
    const temp = await axios
      .get("https://treasure-hunt-smoy.onrender.com/currentplayer", {
        headers,
        params,
      })
      // .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    const temp1 = await axios
      .get("https://treasure-hunt-smoy.onrender.com/currentuser", {
        headers,
        params,
      })
      // .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setComp(
      <Profile
        username={temp1.data.username}
        email={temp1.data.email}
        phone={temp1.data.phone}
        score={temp.data.score}
      />
    );
  };

  const SignOut = () => {
    localStorage.clear();
    navigate("/");
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
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/10/threelines.png"
                          alt=""
                        />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              // href="#"
                              onClick={loadProfile}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-32"
                              )}
                            >
                              Your Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              href="#"
                              onClick={SignOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-32"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
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
