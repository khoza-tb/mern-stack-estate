import express from "express";

import {
  getDashboardStats,
  getRecentActivity,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllListings,
  deleteListing,
  getAllInquiries,
  updateInquiryStatusAdmin,
  deleteInquiry,
} from "../controllers/admin.controller.js";

import {
  adminSignin,
} from "../controllers/auth.controller.js";

import { verifyToken } from "../utils/VerifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

// =====================================================
// ADMIN AUTHENTICATION
// =====================================================

// POST /api/admin/signin
//
// This route is intentionally public.
// The adminSignin controller itself verifies that
// the account has role: "admin".
router.post(
  "/signin",
  adminSignin
);

// =====================================================
// DASHBOARD
// =====================================================

// GET /api/admin/stats
router.get(
  "/stats",
  verifyToken,
  verifyAdmin,
  getDashboardStats
);

// GET /api/admin/activity
router.get(
  "/activity",
  verifyToken,
  verifyAdmin,
  getRecentActivity
);

// =====================================================
// USERS
// =====================================================

// GET /api/admin/users
router.get(
  "/users",
  verifyToken,
  verifyAdmin,
  getAllUsers
);

// PATCH /api/admin/users/:userId/role
router.patch(
  "/users/:userId/role",
  verifyToken,
  verifyAdmin,
  updateUserRole
);

// DELETE /api/admin/users/:userId
router.delete(
  "/users/:userId",
  verifyToken,
  verifyAdmin,
  deleteUser
);

// =====================================================
// LISTINGS
// =====================================================

// GET /api/admin/listings
router.get(
  "/listings",
  verifyToken,
  verifyAdmin,
  getAllListings
);

// DELETE /api/admin/listings/:listingId
router.delete(
  "/listings/:listingId",
  verifyToken,
  verifyAdmin,
  deleteListing
);

// =====================================================
// INQUIRIES
// =====================================================

// GET /api/admin/inquiries
router.get(
  "/inquiries",
  verifyToken,
  verifyAdmin,
  getAllInquiries
);

// PATCH /api/admin/inquiries/:inquiryId/status
router.patch(
  "/inquiries/:inquiryId/status",
  verifyToken,
  verifyAdmin,
  updateInquiryStatusAdmin
);

// DELETE /api/admin/inquiries/:inquiryId
router.delete(
  "/inquiries/:inquiryId",
  verifyToken,
  verifyAdmin,
  deleteInquiry
);

export default router;