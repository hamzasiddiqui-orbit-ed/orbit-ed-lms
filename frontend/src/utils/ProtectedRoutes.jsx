import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { state: userState } = useContext(UserContext);

  return (
    userState.user ? <Outlet/> : <Navigate to="/"/>
  )
}

export default ProtectedRoutes;
