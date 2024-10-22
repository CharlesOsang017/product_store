import { useState } from "react";
import ThemeIcon from "../utils/themeIcon";
import { FaCirclePlus, FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false)

  const handleToggleDarkMode = ()=>{
    setDarkMode(!darkMode)
  }

  return (
  <div className={`${darkMode && "dark"}`}>
      <header className="bg-stone-950 text-white px-10 py-4 ">
      <div className="container sm:flex gap-3 justify-between">
        <Link to={"/"}>
          <div className="dark:text-red-500 nav-text text-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 ">
            PRODUCT STORE
          </div>
        </Link>

        <div className="nav-logos  flex gap-4">
          <Link to={"/create"}>
            <div className="logo-1">
              <button className="text-white hover:bg-stone-600 btn bg-stone-600 border-none ">
                <FaCirclePlus />
              </button>
            </div>
          </Link>
          <div className="logo-2 tex-sm">
            <button onClick={handleToggleDarkMode} className="text-white hover:bg-stone-600 btn bg-stone-600 border-none">
            {darkMode ? <MdSunny /> :<FaMoon /> }
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
  );
};

export default Navbar;
