import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-red to-blue w-full h-20 flex items-center">
      <div className="w-full text-white flex justify-content-center pl-5 lg:pl-12 items-center flex-row">
        <div className="w-full flex flex-row items-center">
          <Link className="text-3xl font-semibold" to="/">
            votingbuck
          </Link>
          <Link
            className="hidden lg:block lg:ml-24 text-xl font-normal text-opacity-75"
            to="/corporations"
          >
            corporations
          </Link>
          <Link
            className="hidden lg:block lg:ml-12 text-xl font-normal text-opacity-75"
            to="/universities"
          >
            universities
          </Link>
          <Link
            className="hidden lg:block lg:ml-12 text-xl font-normal text-opacity-75"
            to="/politicians"
          >
            politicians
          </Link>
        </div>
        <div className="pr-5">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <button
            onClick={handleClick}
            className="lg:hidden h-10 px-6 text-blueGray600 bg-white text-sm border border-blueGray300 outline-none shadow-lg rounded-lg"
          >
            <GiHamburgerMenu size="1.25em" />
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="lg:hidden absolute top-20 bg-gradient-to-r from-red to-blue w-full -mt-1 text-white flex flex-col pb-5 z-50">
          <Link
            className="ml-5 text-xl font-normal text-opacity-75"
            to="/corporations"
          >
            corporations
          </Link>
          <Link
            className="ml-5 text-xl font-normal text-opacity-75"
            to="/universities"
          >
            universities
          </Link>
          <Link
            className="ml-5 text-xl font-normal text-opacity-75"
            to="/politicians"
          >
            politicians
          </Link>
          <div className="w-full flex justify-center pt-5">
            <SearchBar />
          </div>
        </div>
      ) : null}
    </header>
  );
}
