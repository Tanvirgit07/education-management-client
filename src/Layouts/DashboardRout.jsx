import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const DashboardRout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardRout;
