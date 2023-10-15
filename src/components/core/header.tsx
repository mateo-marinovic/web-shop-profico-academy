"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUsersContext } from "@/contexts/users.context";
import { Roles } from "@/enums/roles";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const { user, onUserSignOut } = useUsersContext();
  const isUserLoggedIn = user !== null;

  function onMenuClick() {
    setIsMenuOpen(!isMenuOpen);
    setIsUserMenuOpen(false);
  }
  function onUserMenuClick() {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMenuOpen(false);
  }
  function onSignOutClick() {
    setIsUserMenuOpen(false);
    onUserSignOut();
  }

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between relative">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <FontAwesomeIcon
              onClick={onMenuClick}
              icon={faBars}
              style={{ color: "#e2e6ee" }}
            />
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {isUserLoggedIn ? (
                  <>
                    <Link
                      href="/products"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      Products
                    </Link>
                    <Link
                      href="/wish-list"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Wishlist
                    </Link>
                    {user.role === Roles.Admin && (
                      <Link
                        href="/products/new"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        aria-current="page"
                      >
                        Add new product
                      </Link>
                    )}
                    <Link
                      href="/cart"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      Cart
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/sign-in"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              {isUserLoggedIn && (
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={onUserMenuClick}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
              )}

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="block px-4 py-2 text-sm">
                    {`${user?.firstName} ${user?.lastName}`}
                  </div>
                  <button
                    onClick={onSignOutClick}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="sm:hidden bg-gray-800 absolute z-10 w-full"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {isUserLoggedIn ? (
              <>
                <Link
                  href="/products"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Products
                </Link>
                <Link
                  href="/wish-list"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Wishlist
                </Link>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  aria-current="page"
                >
                  Cart
                </Link>
                <Link
                  href="/products/new"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  aria-current="page"
                >
                  Add new product
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Sing in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
