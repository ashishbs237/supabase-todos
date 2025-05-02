import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./ContextProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) return null; // or a loading spinner

  if (!user || !user.id) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
