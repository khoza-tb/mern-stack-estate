import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({
  children,
  allowedRoles,
}) {
  const { currentUser } = useSelector(
    (state) => state.user
  );

  const location = useLocation();

  // ========================================
  // NOT LOGGED IN
  // ========================================

  if (!currentUser) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location }}
      />
    );
  }

  // ========================================
  // ROLE PROTECTION
  // ========================================

  if (
    Array.isArray(allowedRoles) &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(currentUser.role)
  ) {
    // Admin trying to access normal user area
    if (currentUser.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    // Normal user trying to access admin area
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  // ========================================
  // ACCESS GRANTED
  // ========================================

  return children;
}