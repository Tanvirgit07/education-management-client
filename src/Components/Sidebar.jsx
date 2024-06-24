import { useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { BsChatSquareQuoteFill } from "react-icons/bs";
// import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdClass, MdLibraryAdd } from "react-icons/md";
import UseAuth from "../Hooks/useAuth";
import { RiPresentationLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { LuContainer } from "react-icons/lu";
import useRole from "../Hooks/useRole";
import { IoHome } from "react-icons/io5";
const Sidebar = () => {
  const { userLogout } = UseAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
  const navigate = useNavigate();
  // console.log(role);

  useEffect(() => {
    if (role?.role === "admin") {
      navigate("/dashboard/teacher-request");
    }
  }, [navigate, role?.role]);

  // useEffect(() => {
  //   if (role?.role === "teacher") {
  //     navigate("/dashboard/add-class");
  //   }
  // }, [navigate, role?.role]);

  useEffect(() => {
    if (role?.role === "student") {
      navigate("/dashboard/my-enroll");
    }
  }, [navigate, role?.role]);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

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
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="flex h-14 font-semibold rounded-md justify-center items-center shadow-md text-2xl my-auto ">
          <Link to="/" className="w-full">
            <button className="btn w-full text-xl bg-orange-300">
              <p>
                <IoHome className="text-3xl" />
              </p>
              eduCare
            </button>
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 "
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="flex h-14 font-semibold rounded-md justify-center items-center shadow-md text-2xl my-auto">
            <Link to='/' className="w-full">
              <button className="btn w-full text-xl bg-orange-300">
                <p>
                  <IoHome className="text-3xl" />
                </p>
                eduCare
              </button>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {role?.role === "student" ? (
                <NavLink
                  to="my-enroll"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <RiPresentationLine className="w-5 h-5" />

                  <span className="mx-4 font-medium">My enroll class</span>
                </NavLink>
              ) : (
                ""
              )}

              {role?.role === "admin" ? (
                <NavLink
                  to="teacher-request"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <BsChatSquareQuoteFill className="w-5 h-5" />

                  <span className="mx-4 font-medium">Teacher Request</span>
                </NavLink>
              ) : (
                ""
              )}

              {role?.role === "admin" ? (
                <NavLink
                  to="user"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <FaUser className="w-5 h-5" />

                  <span className="mx-4 font-medium">Users</span>
                </NavLink>
              ) : (
                ""
              )}

              {role?.role === "admin" ? (
                <NavLink
                  to="all-class"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <LuContainer className="w-5 h-5" />

                  <span className="mx-4 font-medium">All classes</span>
                </NavLink>
              ) : (
                ""
              )}

              {role?.role === "teacher" ? (
                <NavLink
                  to="add-class"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <MdLibraryAdd className="w-5 h-5" />

                  <span className="mx-4 font-medium">Add class</span>
                </NavLink>
              ) : (
                ""
              )}

              {role?.role === "teacher" ? (
                <NavLink
                  to="my-class"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <MdClass className="w-5 h-5" />

                  <span className="mx-4 font-medium">My class</span>
                </NavLink>
              ) : (
                ""
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
