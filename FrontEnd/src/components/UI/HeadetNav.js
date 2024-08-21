// Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HeaderNav({ auth }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="image/bycicle.png" className="h-10" alt="Logo" />
          <span className="self-center text-2xl font-extrabold whitespace-nowrap">B Travel</span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link to='/map' className="block py-2 px-3 text-white text-lg bg-blue-700 rounded md:bg-transparent md:text-black md:p-0 font-bold" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to='/board' className="block py-2 px-3 text-white text-lg font-bold bg-blue-700 rounded md:bg-transparent md:text-black md:p-0" aria-current="page">Board</Link>
            </li>
            <li className="relative">
              <button
                id="dropdownNavbarLink"
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto text-lg font-bold"
              >
               More
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div id="dropdownNavbar" className="absolute mt-2 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                    <li>
                      <Link to='/myinfo' className="block px-4 py-2 hover:bg-gray-100">Mypage</Link>
                    </li>
                    <li>
                      <Link to='/admin' className="block px-4 py-2 hover:bg-gray-100">Admin</Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Link to='/logout' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
                  </div>
                </div>
              )}
            </li>
            {!auth && (  // 로그인되지 않은 경우에만 보이도록 설정
              <>
                <li>
                  <Link to='/login' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-lg font-bold">Login</Link>
                </li>
                <li>
                  <Link to='/register' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-lg font-bold">Join</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderNav;
