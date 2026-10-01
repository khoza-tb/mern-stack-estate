import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

export default function Header() {
  const { currentUser, loading } = useSelector(
    (state) => state.user
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isAdmin =
    currentUser?.role &&
    String(currentUser.role).toLowerCase() === "admin";

  // =========================================================
  // SIGN OUT
  // =========================================================

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const response = await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });

      const text = await response.text();

      let data = {};

      if (text && text.trim()) {
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.warn(
            "Sign out response was not JSON:",
            text
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to sign out."
        );
      }

      dispatch(signOutUserSuccess());

      closeMenu();

      navigate(
        isAdmin ? "/admin/signin" : "/signin",
        { replace: true }
      );
    } catch (error) {
      console.error("SIGN OUT ERROR:", error);

      /*
       * Clear the local Redux session even if the
       * server-side request fails.
       */
      dispatch(
        signOutUserFailure(
          error.message || "Failed to sign out."
        )
      );

      dispatch(signOutUserSuccess());

      closeMenu();

      navigate(
        isAdmin ? "/admin/signin" : "/signin",
        { replace: true }
      );
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl sm:text-2xl font-bold text-green-700 whitespace-nowrap"
          >
            PrimePlaceEstate
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">

            <Link
              to="/"
              className="text-slate-700 hover:text-green-700 transition-colors duration-200"
            >
              Home
            </Link>

            <Link
              to="/search"
              className="text-slate-700 hover:text-green-700 transition-colors duration-200"
            >
              Explore
            </Link>

            <Link
              to="/about"
              className="text-slate-700 hover:text-green-700 transition-colors duration-200"
            >
              About
            </Link>

            {/* LOGGED-IN USER / ADMIN */}
            {currentUser ? (
              isAdmin ? (
                <>
                  {/* ADMIN DASHBOARD */}
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-12h8V3h-8v6z"
                      />
                    </svg>

                    Admin Dashboard
                  </Link>

                  {/* ADMIN SIGN OUT */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={loading}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-5-4l5-5m0 0l-5-5m5 5H3"
                      />
                    </svg>

                    {loading ? "Signing Out..." : "Sign Out"}
                  </button>
                </>
              ) : (
                <>
                  {/* NORMAL USER PROFILE */}
                  <Link to="/profile">
                    <img
                      src={
                        currentUser.photo ||
                        currentUser.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-600 hover:opacity-80 transition"
                    />
                  </Link>
                </>
              )
            ) : (
              <Link
                to="/signin"
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              /* CLOSE ICON */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* HAMBURGER ICON */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-slate-100">

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-3 rounded-lg text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
              >
                Home
              </Link>

              <Link
                to="/search"
                onClick={closeMenu}
                className="px-3 py-3 rounded-lg text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
              >
                Explore
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="px-3 py-3 rounded-lg text-slate-700 hover:bg-green-50 hover:text-green-700 transition"
              >
                About
              </Link>

              {/* MOBILE ADMIN / USER */}
              {currentUser ? (
                isAdmin ? (
                  <>
                    {/* MOBILE ADMIN DASHBOARD */}
                    <Link
                      to="/admin/dashboard"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-12h8V3h-8v6z"
                        />
                      </svg>

                      <span className="font-medium">
                        Admin Dashboard
                      </span>
                    </Link>

                    {/* MOBILE ADMIN SIGN OUT */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={loading}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-5-4l5-5m0 0l-5-5m5 5H3"
                        />
                      </svg>

                      <span className="font-medium">
                        {loading
                          ? "Signing Out..."
                          : "Sign Out"}
                      </span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-green-50 transition"
                  >
                    <img
                      src={
                        currentUser.photo ||
                        currentUser.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-600"
                    />

                    <span className="text-slate-700 font-medium">
                      Profile
                    </span>
                  </Link>
                )
              ) : (
                <Link
                  to="/signin"
                  onClick={closeMenu}
                  className="mt-2 text-center bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}

            </div>
          </nav>
        )}
      </div>
    </header>
  );
}