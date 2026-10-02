import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import OAuth from "../components/OAuth";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.user
  );

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // =====================================================
  // USER SIGN IN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      dispatch(
        signInFailure(
          "Please enter your email and password."
        )
      );
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // -------------------------------------------------
      // SAFELY READ RESPONSE
      // -------------------------------------------------

      const text = await res.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error(
          "USER SIGNIN JSON ERROR:",
          parseError
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      console.log(
        "USER SIGNIN RESPONSE:",
        data
      );

      // -------------------------------------------------
      // HANDLE SERVER ERROR
      // -------------------------------------------------

      if (!res.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Wrong email or password."
        );
      }

      // -------------------------------------------------
      // GET USER
      // -------------------------------------------------

      const userPayload =
        data.user ||
        data.rest ||
        data;

      if (!userPayload?._id) {
        console.error(
          "INVALID USER RESPONSE:",
          data
        );

        throw new Error(
          "Login succeeded but user information was missing."
        );
      }

      // -------------------------------------------------
      // SECURITY CHECK
      // -------------------------------------------------

      if (userPayload.role === "admin") {
        console.error(
          "ADMIN ACCOUNT RETURNED FROM USER LOGIN"
        );

        throw new Error(
          "Admin accounts must use the admin sign-in page."
        );
      }

      // -------------------------------------------------
      // SAVE USER TO REDUX
      // -------------------------------------------------

      dispatch(
        signInSuccess(userPayload)
      );

      console.log(
        "USER LOGIN SUCCESS:",
        userPayload
      );

      // -------------------------------------------------
      // USER PROFILE
      // -------------------------------------------------

      navigate("/profile");
    } catch (error) {
      console.error(
        "USER SIGNIN ERROR:",
        error
      );

      dispatch(
        signInFailure(
          error.message ||
            "Something went wrong while signing in."
        )
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* =================================================
            AUTH CARD
        ================================================= */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-6 sm:p-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              User Access
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to your PrimePlaceEstate account
            </p>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

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
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            {/* PASSWORD */}

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            {/* FORGOT PASSWORD */}

            <div className="text-right mb-5">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* SIGN IN */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading
                ? "Signing In..."
                : "Sign In as User"}
            </button>
          </form>

          {/* =================================================
              SIGN UP
          ================================================= */}

          <div className="text-center mt-5">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Don't have a user account?{" "}

              <Link
                to="/signup"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
          </div>

          {/* =================================================
              GOOGLE
          ================================================= */}

          <OAuth />

          {/* =================================================
              ADMIN NOTICE
          ================================================= */}

          <div className="mt-6 p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrator?
            </p>

            <Link
              to="/admin/signin"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Use Admin Sign In
            </Link>
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
            BACK TO HOME
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