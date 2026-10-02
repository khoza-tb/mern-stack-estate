import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // USER INPUT
  // =====================================================

  const handleUserChange = (e) => {
    const { id, value } = e.target;

    setUserForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // =====================================================
  // USER SIGN UP
  // =====================================================

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    // ===================================================
    // VALIDATE INPUT
    // ===================================================

    if (
      !userForm.username.trim() ||
      !userForm.email.trim() ||
      !userForm.password
    ) {
      setError(
        "Please enter your username, email and password."
      );
      return;
    }

    if (userForm.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      // =================================================
      // PUBLIC USER SIGNUP
      // =================================================
      //
      // IMPORTANT:
      // We deliberately DO NOT send a role here.
      //
      // The backend signup controller must always create:
      //
      // role: "user"
      //
      // This prevents the public from creating admin accounts.

      const res = await fetch(
        "/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            username: userForm.username.trim(),
            email: userForm.email.trim().toLowerCase(),
            password: userForm.password,
          }),
        }
      );

      const text = await res.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error(
          "USER SIGNUP JSON ERROR:",
          parseError
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      console.log(
        "USER SIGNUP RESPONSE:",
        data
      );

      // =================================================
      // HANDLE SERVER ERROR
      // =================================================

      if (!res.ok || data.success === false) {
        throw new Error(
          data.message ||
            "Unable to create user account."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        "✅ USER ACCOUNT CREATED"
      );

      setError(null);

      navigate("/signin");
    } catch (error) {
      console.error(
        "USER SIGNUP ERROR:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-6 sm:p-8">

          {/* =================================================
              USER SIGN UP HEADER
          ================================================= */}

          <div className="text-center mb-6">

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Create Account
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Create your PrimePlaceEstate account
            </p>

          </div>

          {/* =================================================
              USER SIGN UP FORM
          ================================================= */}

          <form
            onSubmit={handleUserSubmit}
            className="flex flex-col"
          >

            {/* =================================================
                USERNAME
            ================================================= */}

            <div className="mb-4">

              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={userForm.username}
                onChange={handleUserChange}
                autoComplete="username"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-60"
              />

            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="mb-4">

              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="user@gmail.com"
                value={userForm.email}
                onChange={handleUserChange}
                autoComplete="email"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-60"
              />

            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="mb-5">

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={userForm.password}
                onChange={handleUserChange}
                autoComplete="new-password"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-60"
              />

            </div>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create User Account"}
            </button>

          </form>

          {/* =================================================
              USER SIGN IN
          ================================================= */}

          <div className="text-center mt-5">

            <p className="text-gray-600 dark:text-gray-400 text-sm">

              Already have a user account?{" "}

              <Link
                to="/signin"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign In
              </Link>

            </p>

          </div>

          {/* =================================================
              GOOGLE SIGN UP
          ================================================= */}

          <div className="flex items-center gap-3 my-6">

            <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />

          </div>

          <OAuth />

          {/* =================================================
              ADMIN ACCESS NOTICE
          ================================================= */}

          <div className="mt-6 pt-5 border-t border-gray-200 dark:border-slate-800 text-center">

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrator access is restricted to authorized
              administrator accounts.
            </p>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mt-5 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

        </div>

        {/* =================================================
            BACK HOME
        ================================================= */}

        <div className="text-center mt-5">

          <Link
            to="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}