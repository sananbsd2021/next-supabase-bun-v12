import React from "react";

const FooterPage = () => {
  return (
    <div>
      <footer className="w-screen">
        <div className="bg-gray-600">
          <div className="container mx-auto px-6 py-4">
            <div className="lg:flex">
              <div className="w-full lg:w-1/4 ">
                <h3 className="text-2xl font-bold text-white">NongBerd School</h3>
              </div>
              <div className="w-full lg:w-1/2 lg:justify-center">
                <ul className="text-center lg:text-left">
                  <li>
                    <a
                      className="text-white"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white"
                      href="/"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white"
                      href="/"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white"
                      href="/"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-1/4">
                <ul className="text-center lg:text-left">
                  <li>
                    <a
                      className="text-white"
                      href="/"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white"
                      href="/"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white"
                      href="/"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>        
      </footer>
      {/* <footer className="rounded-lg bg-white shadow dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">          
          <br />
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2025{" "}
            <a href="/" className="hover:underline">
              NongBerd School™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer> */}
    </div>
  );
};

export default FooterPage;

