import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ========================================
// USER PAGES
// ========================================
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import UpdateListing from "./pages/UpdateListing";
import ShowListing from "./pages/ShowListing";
import Search from "./pages/Search";
import ForgotPassword from "./pages/ForgotPassword";

// ========================================
// ADMIN PAGES
// ========================================
import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";
import AdminListings from "./pages/AdminListings";
import AdminInquiries from "./pages/AdminInquiries";
import AdminUsers from "./pages/AdminUsers";

// ========================================
// COMPONENTS
// ========================================
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <Router>
      {/* ========================================
          MAIN HEADER
          AdminRoute/pages can hide or replace
          this through their own layout if needed.
      ======================================== */}
      <Header />

      <Routes>
        {/* ========================================
            PUBLIC USER ROUTES
        ======================================== */}

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* SEARCH / EXPLORE */}
        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/explore"
          element={<Search />}
        />

        {/* USER SIGN IN */}
        <Route
          path="/signin"
          element={<SignIn />}
        />

        {/* USER SIGN UP ONLY
            No admin signup exists here. */}
        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* FORGOT PASSWORD */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ========================================
            PUBLIC PROPERTY VIEW
        ======================================== */}

        <Route
          path="/listing/:id"
          element={<ShowListing />}
        />

        {/* ========================================
            USER PROTECTED ROUTES
            Only role: "user" can access these.
        ======================================== */}

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* CREATE LISTING */}
        <Route
          path="/create-listing"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <CreateListing />
            </PrivateRoute>
          }
        />

        {/* MY LISTINGS */}
        <Route
          path="/my-listings"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <MyListings />
            </PrivateRoute>
          }
        />

        {/* UPDATE LISTING */}
        <Route
          path="/update-listing/:id"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <UpdateListing />
            </PrivateRoute>
          }
        />

        {/* ========================================
            ADMIN SIGN IN
            This is PUBLIC, but only an existing
            admin account can successfully sign in.
        ======================================== */}

        <Route
          path="/admin/signin"
          element={<AdminSignIn />}
        />

        {/* ========================================
            ADMIN DASHBOARD
            AdminRoute must verify role === "admin".
        ======================================== */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ========================================
            ADMIN LISTINGS
        ======================================== */}

        <Route
          path="/admin/listings"
          element={
            <AdminRoute>
              <AdminListings />
            </AdminRoute>
          }
        />

        {/* ========================================
            ADMIN USERS
        ======================================== */}

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        {/* ========================================
            ADMIN INQUIRIES
        ======================================== */}

        <Route
          path="/admin/inquiries"
          element={
            <AdminRoute>
              <AdminInquiries />
            </AdminRoute>
          }
        />

        {/* ========================================
            FALLBACK
        ======================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}