import { errorHandler } from "./error.js";

export const verifyAdmin = (req, res, next) => {
  // ========================================
  // AUTHENTICATION CHECK
  // ========================================
  if (!req.user) {
    return next(
      errorHandler(
        401,
        "You are not authenticated!"
      )
    );
  }

  // ========================================
  // ADMIN ROLE CHECK
  // ========================================
  if (req.user.role !== "admin") {
    return next(
      errorHandler(
        403,
        "Admin access required!"
      )
    );
  }

  // ========================================
  // ADMIN VERIFIED
  // ========================================
  next();
};