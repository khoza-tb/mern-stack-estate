import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  RefreshCw,
  X,
  AlertCircle,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

export default function AdminHeader() {
  const { currentUser, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================================================
  // SAFE RESPONSE PARSER
  // =========================================================

  const parseResponse = async (response) => {
    const text = await response.text();

    if (!text || !text.trim()) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("INVALID JSON RESPONSE:", text);

      return {
        message: "Server returned an invalid response.",
      };
    }
  };

  // =========================================================
  // FETCH ADMIN STATS
  // =========================================================

  const fetchStats = async () => {
    // Do not fetch admin data if there is no logged-in admin
    if (!currentUser || currentUser.role !== "admin") {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/stats", {
        method: "GET",
        credentials: "include",
      });

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to load admin statistics. (${response.status})`
        );
      }

      setStats(data);
    } catch (error) {
      console.error("FETCH ADMIN STATS ERROR:", error);

      setError(
        error.message || "Failed to load admin statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL FETCH + AUTO REFRESH
  // =========================================================

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      return;
    }

    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [currentUser]);

  // =========================================================
  // EXTRACT NEW INQUIRIES
  // =========================================================

  const newInquiries =
    stats?.newInquiries ??
    stats?.stats?.newInquiries ??
    stats?.data?.newInquiries ??
    0;

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = async () => {
    await fetchStats();
  };

  // =========================================================
  // ADMIN SIGN OUT
  // =========================================================

  const handleSignOut = async () => {
    if (userLoading) {
      return;
    }

    console.log("ADMIN SIGN OUT BUTTON CLICKED");

    dispatch(signOutUserStart());

    try {
      const response = await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });

      const data = await parseResponse(response);

      if (!response.ok) {
        console.warn(
          "SERVER SIGN OUT RESPONSE:",
          data.message || response.status
        );
      } else {
        console.log("SERVER SIGN OUT SUCCESS");
      }
    } catch (error) {
      console.error(
        "SERVER SIGN OUT REQUEST FAILED:",
        error
      );
    } finally {
      // =====================================================
      // ALWAYS CLEAR THE FRONTEND SESSION
      // =====================================================

      dispatch(signOutUserSuccess());

      // =====================================================
      // CLOSE UI ELEMENTS
      // =====================================================

      setNotificationOpen(false);
      setStats(null);
      setError("");

      console.log("ADMIN SESSION CLEARED");

      // =====================================================
      // ALWAYS GO TO HOME PAGE
      // =====================================================

      navigate("/", {
        replace: true,
      });

      console.log("REDIRECTED TO HOME");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =================================================
            LEFT
        ================================================= */}

        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Admin Panel
          </h1>

          <p className="hidden text-xs text-gray-500 sm:block dark:text-gray-400">
            Manage your PrimePlaceEstate platform
          </p>
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* =================================================
              REFRESH
          ================================================= */}

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || userLoading}
            title="Refresh"
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <RefreshCw
              size={19}
              className={loading ? "animate-spin" : ""}
            />
          </button>

          {/* =================================================
              NOTIFICATION
          ================================================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setNotificationOpen((prev) => !prev)
              }
              disabled={userLoading}
              className="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={20} />

              {newInquiries > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {newInquiries > 9
                    ? "9+"
                    : newInquiries}
                </span>
              )}
            </button>

            {/* =================================================
                NOTIFICATION DROPDOWN
            ================================================= */}

            {notificationOpen && (
              <>
                {/* BACKDROP */}

                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() =>
                    setNotificationOpen(false)
                  }
                  className="fixed inset-0 z-40 cursor-default"
                />

                <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">

                  {/* HEADER */}

                  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Recent activity
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNotificationOpen(false)
                      }
                      className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      <X size={17} />
                    </button>

                  </div>

                  {/* ERROR */}

                  {error && (
                    <div className="border-b border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-950/30">

                      <div className="flex gap-2">

                        <AlertCircle
                          size={17}
                          className="mt-0.5 shrink-0 text-red-500"
                        />

                        <p className="text-xs text-red-600 dark:text-red-400">
                          {error}
                        </p>

                      </div>

                    </div>
                  )}

                  {/* NEW INQUIRIES */}

                  <div className="p-3">

                    {newInquiries > 0 ? (
                      <Link
                        to="/admin/inquiries"
                        onClick={() =>
                          setNotificationOpen(false)
                        }
                        className="flex items-start gap-3 rounded-lg p-3 transition hover:bg-gray-50 dark:hover:bg-gray-800"
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          <MessageSquare size={19} />
                        </div>

                        <div className="min-w-0">

                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            New inquiries
                          </p>

                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            You have{" "}

                            <span className="font-semibold text-green-600 dark:text-green-400">
                              {newInquiries}
                            </span>{" "}

                            new{" "}

                            {newInquiries === 1
                              ? "property inquiry"
                              : "property inquiries"}.
                          </p>

                        </div>

                      </Link>
                    ) : (
                      <div className="px-3 py-6 text-center">

                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
                          <Bell size={18} />
                        </div>

                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          No new notifications
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          You're all caught up.
                        </p>

                      </div>
                    )}

                  </div>
                </div>
              </>
            )}
          </div>

          {/* =================================================
              ADMIN PROFILE
          ================================================= */}

          <div className="hidden items-center gap-3 border-l border-gray-200 pl-3 sm:flex dark:border-gray-700">

            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.username || "Admin"}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {currentUser?.username
                  ?.charAt(0)
                  ?.toUpperCase() || "A"}
              </div>
            )}

            <div className="hidden lg:block">

              <p className="max-w-32 truncate text-sm font-medium text-gray-900 dark:text-white">
                {currentUser?.username || "Admin"}
              </p>

              <p className="max-w-40 truncate text-xs text-gray-500 dark:text-gray-400">
                {currentUser?.email || ""}
              </p>

            </div>

          </div>

          {/* =================================================
              SIGN OUT
          ================================================= */}

          <button
            type="button"
            onClick={handleSignOut}
            disabled={userLoading}
            title="Sign Out"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >

            <LogOut size={17} />

            <span className="hidden sm:inline">
              {userLoading
                ? "Signing Out..."
                : "Sign Out"}
            </span>

          </button>

        </div>
      </div>
    </header>
  );
}