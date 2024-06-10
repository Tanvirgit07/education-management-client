import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types'

const PrivetRout = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if(loading){
        return (
            <div className="h-[50vh] flex justify-center">
                <span className="loading h-screen loading-spinner loading-lg"></span>
            </div>
        )
    }
    if(user) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

PrivetRout.propTypes = {
    children:PropTypes.node
}

export default PrivetRout;