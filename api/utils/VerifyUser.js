import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    // ========================================
    // NO TOKEN
    // ========================================
    if (!token) {
      return next(
        errorHandler(
          401,
          "You are not authenticated!"
        )
      );
    }

    // ========================================
    // VERIFY JWT
    // ========================================
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          console.error(
            "JWT VERIFY ERROR:",
            err.message
          );

          return next(
            errorHandler(
              403,
              "Token is not valid!"
            )
          );
        }

        // ========================================
        // AUTHENTICATED USER
        // ========================================
        req.user = decoded;

        console.log(
          "AUTHENTICATED USER:",
          {
            id: decoded.id,
            role: decoded.role,
          }
        );

        next();
      }
    );
  } catch (error) {
    console.error(
      "VERIFY TOKEN ERROR:",
      error
    );

    next(error);
  }
};