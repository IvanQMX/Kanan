import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ReactComponent as Logo } from "../svg/logo.svg";
import { ReactComponent as HorizontalLogo } from "../svg/horizontal.svg";

const navigation = [{ name: "Reportar Caso", href: "/reportar-caso" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ sessionState }: Navbar) {
  const [session, setSession] = sessionState;
  const signOut = () => {
    setSession(null);
    window.location.href = "/";
  };
  return (
    <Disclosure as="nav" className="sticky top-0 bg-blue-500">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {session ? (
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 focus:outline-none focus:bg-gray-800 focus:text-white">
                    <span className="sr-only">Abrir menú</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              ) : (
                <Fragment />
              )}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <NavLink to="/">
                    <Logo className="block sm:hidden h-12 w-auto fill-white" />
                    <HorizontalLogo className="hidden sm:block h-6 w-auto fill-white" />
                  </NavLink>
                </div>
                {session ? (
                  <div className="hidden sm:flex sm:ml-6 sm:items-center">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive ? "bg-blue-600" : "hover:bg-blue-400",
                              "text-white px-3 py-2 rounded-md text-sm font-medium"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Fragment />
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-blue-500 flex text-sm rounded-full focus:outline-none border-2 border-opacity-80 border-blue-100">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) =>
                          session ? (
                            <div
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={signOut}
                            >
                              Cerrar Sesión
                            </div>
                          ) : (
                            <Link
                              to="/iniciar-sesion"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Iniciar sesión
                            </Link>
                          )
                        }
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-100 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
