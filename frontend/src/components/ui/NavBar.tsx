import { FiMenu as MenuIcon } from "react-icons/fi";
import { RxCross1 as CrossIcon } from "react-icons/rx";
import { useState } from "react";
import useLogout from "../../hooks/useLogout";

const navLinks = [
  { title: "home", link: "/", id: 1 },
  { title: "Appointment", link: "/", id: 2 },
];
export default function Navbar() {
  const [open, setOpen] = useState(false); // this open refers to dropdown menu of mobile
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = "home";

  const navColor = "bg-white/75 backdrop-blur-md";

  return (
    <>
      <nav
        className={`relative top-0 z-[102] w-full px-4 ${navColor} shadow-xl ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } transform drop-shadow-md transition-transform duration-200`}
      >
        <div
          className={`desktop-nav-bar fixed left-0 top-0 z-40 ${
            !open && "hidden"
          } h-full w-full`}
        >
          <div className="absolute right-5 top-6">
            <CrossIcon
              className="text-primary"
              size={25}
              onClick={() => setOpen(false)}
            />
          </div>
          <div
            className={`m-auto mt-16 flex flex-col text-base ${navColor} font-normal text-black`}
          >
            {/* mobile nav links */}
            {navLinks.map((item) => (
              <a
                className={`border-primary border-b py-5 text-lg capitalize ${
                  pathname === item.link ? "text-primary" : ""
                } text-center`}
                href={item.link}
                key={item.id}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div
          role="navigation"
          className="container-x nav-bar z-30 m-auto flex h-16 w-full items-center justify-between rounded-sm bg-transparent"
        >
          <a className="flex items-center justify-self-start" href={"/"}>
            <img
              className="h-12 "
              src="https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
              alt="logo"
              width={150}
              height={40}
            />
            <h1 className="text-primary justify-self-center pl-2 text-xl font-extrabold ml:text-2xl">
              Find Doctor App
            </h1>
          </a>
          {/* <input className="text-violet-700 md:block hidden" type="search" placeholder="dfdfd"/> */}
          <div className="hidden items-center gap-2 text-black md:flex">
            {navLinks.map((item) => (
              <a
                className={`S_Underline relative inline-block px-2 py-2 capitalize lg:px-4 ${
                  pathname === item.link
                    ? "text-primary after:bg-primary"
                    : "after:bg-black"
                } hover:after:left-3 hover:after:w-[72%]`}
                href={item.link}
                key={item.id}
              >
                {item.title}
              </a>
            ))}
          </div>

          <button onClick={useLogout()}>Logout</button>

          <div className="flex items-center gap-4 md:hidden">
            <div className={`block justify-self-end ${open && "opacity-0"}`}>
              <MenuIcon
                size={24}
                className={`text-primary h-8 w-8`}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
