import React from "react";
import { AiFillForward } from "react-icons/ai";

const ControlPanalPage = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-6">

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/newslists">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            จัดการข่าวประชาสัมพันธ์
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มข่าวประชาสัมพันธ์
        </p>
        <a
          href="/protected/newslists"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อข่าว
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/Cpanal/gallerys">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          จัดการภาพกิจกรรม
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มภาพกิจกรรม
        </p>
        <a
          href="/protected/gallerys"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มภาพกิจกรรม
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/news">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          จัดการข่าวสาร
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มข่าวสาร
        </p>
        <a
          href="/protected/news"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข่าวสาร
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/edunews">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          จัดการข่าวการศึกษา
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มข่าวการศึกษา
        </p>
        <a
          href="/protected/edunews"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข่าวการศึกษา
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

    </div>
  );
};

export default ControlPanalPage;
