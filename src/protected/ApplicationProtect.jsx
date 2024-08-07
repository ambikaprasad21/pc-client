import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function ApplicationProtect({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return children;
}

export default ApplicationProtect;
