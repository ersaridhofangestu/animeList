import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/icon.svg"
import { FaBars, FaBookOpen, FaPlay, FaSearch, FaStar, FaThumbsUp, FaUserAstronaut, FaUserPlus, FaUserTie } from "react-icons/fa";
import { IoLogInSharp, IoTriangle } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdForum } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

const NavbarComponent = () => {
  const [mobile, setMobile] = useState(false)
  const handleClick = () => setMobile(!mobile)
  return (
    <>
      <header className="hidden lg:block bg-dark/90 w-full text-light/80 font-semibold capitalize py-2 fixed z-50">
        <nav className="flex justify-between items-center max-w-[66rem] mx-auto">
          <Link to={"/"} >
            <img src={Icon} alt="anilist.co" width={50} />
          </Link>
          <div className="flex items-center justify-center gap-16 w-full transition-colors duration-300">
            <div className="flex items-center gap-8">
              <div className="group/search relative top-0 bottom-0 flex items-center">
                <div className="hover:text-light" >search
                  <div className="hidden group-hover/search:block text-dark/80 -ml-10 fixed z-30">
                    <div className="shadow-md shadow-light rounded-lg overflow-hidden mt-5">
                      <div className="bg-white p-5 capitalize">
                        <IoTriangle className="absolute top-0 left-12" fill="white" size={30} />
                        <Link to={"/"} className="flex items-center gap-5 hover:text-dark">
                          <FaPlay />
                          <div>
                            <p>anime</p>
                            <p>top 25 trending top movies</p>
                          </div>
                        </Link>
                        <Link to={"/"} className="flex items-center gap-5 hover:text-dark cursor-not-allowed">
                          <FaBookOpen />
                          <div>
                            <p>manga</p>
                            <p>top 25 trending top movies</p>
                          </div>
                        </Link>
                      </div>
                      <div className="bg-slate-200 p-5 grid grid-cols-2 gap-3">
                        <Link to={"/"} className="flex items-center hover:text-dark gap-2 cursor-not-allowed" >
                          <FaUserTie />
                          <p>staff</p>
                        </Link>
                        <Link to={"/"} className="flex items-center hover:text-dark gap-2 cursor-not-allowed" >
                          <FaStar />
                          <p>reviews</p>
                        </Link>
                        <Link to={"/"} className="flex items-center hover:text-dark gap-2 cursor-not-allowed" >
                          <FaUserAstronaut />
                          <p>characters</p>
                        </Link>
                        <Link to={"/"} className="flex items-center hover:text-dark gap-2 cursor-not-allowed" >
                          <FaThumbsUp />
                          <p>recommendations</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={"/"} className="hover:text-light cursor-not-allowed" >social</Link>
              <Link to={"/"} className="hover:text-light cursor-not-allowed" >forum</Link>
            </div>
            <div className="flex items-center gap-5">
              <Link to={"/"} className="hover:text-light cursor-not-allowed" >log in</Link>
              <Link to={"/"} className="py-2 px-4 bg-blue-500 rounded-md text-white hover:shadow-md hover:shadow-blue-400/50 hover:scale-105 transition-transform duration-150 cursor-not-allowed">Sign up</Link>
            </div>
          </div>
        </nav>
      </header>
      <header className="fixed bottom-5 right-5 lg:hidden z-50">
        <nav className="p-5 bg-white rounded-lg shadow-md shadow-light">
          {mobile != true ? (
            <FaBars onClick={handleClick} size={30} className="fill-sky-500" />
          ) : (
            <div className="grid grid-cols-3 items-center gap-3 text-center justify-center text-dark/80">
              <Link to={"/"} className="hover:text-sky-500 cursor-not-allowed">
                <MdForum size={30} />
                <p>forum</p>
              </Link>
              <Link to={"/"} className="hover:text-sky-500 cursor-not-allowed">
                <HiUserGroup size={30} />
                <p>social</p>
              </Link>
              <Link to={"/"} className="hover:text-sky-500 cursor-not-allowed">
                <FaSearch size={30} />
                <p>search</p>
              </Link>
              <Link to={"/"} className="hover:text-sky-500 cursor-not-allowed">
                <FaUserPlus size={30} />
                <p>sign up</p>
              </Link>
              <Link to={"/"} className="hover:text-sky-500 cursor-not-allowed">
                <IoLogInSharp size={30} />
                <p>login</p>
              </Link>
              <IoIosClose onClick={handleClick} size={50} />
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default NavbarComponent;
