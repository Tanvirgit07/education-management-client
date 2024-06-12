import {  NavLink } from "react-router-dom";
import UseAuth from "../Hooks/useAuth";
import { MdLogin, MdLogout } from "react-icons/md";

const NavBar = () => {
  const { user, userLogout } = UseAuth();
  console.log(user);

  const handleLogout = () => {
    userLogout()
      .then(() => {
        console.log("successfully logOut!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-primary rounded-xl opacity-80 h-24 sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-secondary text-xl font-bold" : "font-bold text-lg text-white"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-secondary text-xl font-bold" : "font-bold text-lg text-white"
                }
                to="/all-class"
              >
                All Classes
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-secondary text-xl font-bold" : "font-bold text-lg text-white"
                }
                to="/teach-eduCare"
              >
                Teach on eduCare
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <div className="w-14 h-14 ">
            <img
              src="https://i.ibb.co/wQ4d2Rv/54264a84e2f96cb7a5c32efa99b4714d.jpg"
              alt=""
            />
          </div>
          <a className="text-3xl text-white font-bold mb-3 ml-3">
            edu<span className="">care</span>
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-secondary text-xl font-bold" : "font-bold text-lg text-white"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-secondary text-xl font-bold " : "font-bold text-lg text-white" 
              }
              to="/all-class"
            >
              All Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-secondary text-xl font-bold" : "font-bold text-lg text-white"
              }
              to="/teach-eduCare"
            >
              Teach on eduCare
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="mr-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user ? (
                <div className="w-12 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              ) : (
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://i.ibb.co/prcjd2h/blank-profile-picture-973460-1280.png"
                  />
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-warning w-52"
            >
              <li>
                <p className="justify-between text-xl font-bold">
                  {user?.displayName}
                </p>
              </li>
              <div className="divider divider-success">Action</div>
              <li className="mb-3">
                <NavLink
                  to="/dashboard"
                  className="justify-between text-xl font-bold"
                >
                  Dashboard
                </NavLink>
              </li>

              {user ? (
                <li>
                  <NavLink
                    className="text-xl font-bold flex items-center"
                    to="/login"
                  >
                    <div onClick={handleLogout} className="flex gap-1">
                      <p>Logout</p>
                      <p className="text-2xl text-red-600 font-bold mt-1">
                        <MdLogout />
                      </p>
                    </div>
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    className="text-xl font-bold flex items-center"
                    to="/login"
                  >
                    <div className="flex gap-1">
                      <p>Login</p>
                      <p className="text-2xl text-green-500 font-bold mt-1">
                        <MdLogin />
                      </p>
                    </div>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* <Link to="/login">
          <button className="btn btn-outline btn-primary px-4 text-lg">
            Login
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default NavBar;




