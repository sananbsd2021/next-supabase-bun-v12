"use client";

import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const NavbarPage = () => {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: "หน้าหลัก", link: "/" },
    { id: 2, text: "about", link: "/" },
  ];

  return (
    <div className="flex m-auto justify-between text-blue-600
     w-full h-16 px-6 shadow-sm text-3xl">
      <hr />
      {/* Right Section */}
      <div className="hidden md:flex flex-1 justify-end items-center space-x-6">
        {/* Home Link */}
        <a
          href="/"
          className="text-xl font-medium text-blue-800 hover:text-black px-4 py-2 transition duration-300"
        >
          หน้าหลัก
        </a>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 text-xl font-medium text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            ข้อมูลโรงเรียน
            <svg
              className={`w-5 h-5 transform transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>

          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <a
                href="#"
                className="text-xl block px-4 py-2 text-blue-700 hover:bg-gray-100 hover:text-gray-900"
              >
                ตราสัญลักษณ์
              </a>
              <a
                href="#"
                className="text-xl block px-4 py-2 text-blue-700 hover:bg-gray-100 hover:text-gray-900"
              >
                คำขวัญ
              </a>
              <a
                href="#"
                className="text-xl block px-4 py-2 text-blue-700 hover:bg-gray-100 hover:text-gray-900"
              >
                วิสัยทัศน์
              </a>
            </div>
          )}
        </div>

        {/* Contact Link */}
        <a
          href="/commands"
          className="text-xl font-medium text-blue-800 hover:text-black px-4 py-2 transition duration-300"
        >
          บุคลากร
        </a>
        {/* Contact Link */}
        {/* <a
          href="/contact"
          className="text-xl font-medium text-blue-800 hover:text-black px-4 py-2 transition duration-300"
        >
          ติดต่อเรา
        </a> */}
      </div>
    </div>
  );
};

export default NavbarPage;
