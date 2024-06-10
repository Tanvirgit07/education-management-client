import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const Roots = () => {
    return (
        <div className="container mx-auto">
            <NavBar></NavBar>
            <div>
                <Outlet></Outlet>
            </div>            
        </div>
    );
};

export default Roots;