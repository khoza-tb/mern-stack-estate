import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const { currentUser } = useSelector(
    (state) => state.user
  );

  const location = useLocation();

  // ========================================
  // NOT LOGGED IN
  // ========================================
  // Send the user to the ADMIN sign-in page,
  // not the normal user sign-in page.
  if (!currentUser) {
    return (
      <Navigate
        to="/admin/signin"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ========================================
  // LOGGED IN BUT NOT ADMIN
  // ========================================
  // Normal users are never allowed into
  // any /admin/* route.
  if (currentUser.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ========================================
  // ADMIN
  // ========================================
  return children;
}