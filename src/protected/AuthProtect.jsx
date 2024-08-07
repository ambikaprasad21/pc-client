import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function AuthProtect({ children }) {
  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default AuthProtect;
