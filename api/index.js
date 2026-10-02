import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// =====================================================
// LOAD ENVIRONMENT VARIABLES
// =====================================================

dotenv.config({
  path: "./api/.env",
});

// =====================================================
// PATH CONFIGURATION
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================================================
// ROUTES
// =====================================================

import authRoutes from "./routes/auth.route.js";
import listingRoutes from "./routes/listing.route.js";
import userRoutes from "./routes/user.route.js";
import favoriteRoutes from "./routes/favorite.route.js";
import inquiryRoutes from "./routes/inquiry.route.js";
import adminRoutes from "./routes/admin.route.js";

// =====================================================
// APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 3000;

// =====================================================
// ENVIRONMENT
// =====================================================

const NODE_ENV =
  process.env.NODE_ENV || "development";

console.log("=================================");
console.log("PRIMEPLACE ESTATE");
console.log("ENVIRONMENT CHECK");
console.log("=================================");

console.log(
  "NODE_ENV:",
  NODE_ENV
);

console.log(
  "MONGO:",
  process.env.MONGO
    ? "LOADED"
    : "NOT LOADED"
);

console.log(
  "JWT_SECRET:",
  process.env.JWT_SECRET
    ? "LOADED"
    : "NOT LOADED"
);

console.log(
  "RESEND API KEY:",
  process.env.RESEND_API_KEY
    ? "LOADED"
    : "NOT LOADED"
);

console.log(
  "RESEND FROM:",
  process.env.RESEND_FROM_EMAIL ||
    "NOT SET"
);

console.log(
  "INQUIRY RECEIVER:",
  process.env.INQUIRY_RECEIVER_EMAIL ||
    "NOT SET"
);

console.log(
  "CLIENT URL:",
  process.env.CLIENT_URL ||
    "NOT SET"
);

console.log(
  "PORT:",
  PORT
);

console.log("=================================");

// =====================================================
// REQUIRED ENVIRONMENT VARIABLES
// =====================================================

if (!process.env.MONGO) {
  console.error(
    "❌ MONGO environment variable is missing."
  );

  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error(
    "❌ JWT_SECRET environment variable is missing."
  );

  process.exit(1);
}

// =====================================================
// BODY PARSING
// =====================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

// =====================================================
// COOKIE PARSER
// =====================================================

/*
  Required by verifyToken.js:

  req.cookies.access_token
*/
app.use(cookieParser());

// =====================================================
// CORS
// =====================================================

const allowedOrigins = [
  "http://localhost:5173",

  "https://mern-stack-estate-1-u4na.onrender.com",

  process.env.CLIENT_URL,
].filter(Boolean);

console.log(
  "ALLOWED CORS ORIGINS:",
  allowedOrigins
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without an Origin header
      // such as some server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      console.log(
        "❌ Blocked CORS origin:",
        origin
      );

      return callback(
        new Error(
          "Not allowed by CORS"
        )
      );
    },

    credentials: true,
  })
);

// =====================================================
// API ROUTES
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/listing",
  listingRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/favorite",
  favoriteRoutes
);

app.use(
  "/api/inquiry",
  inquiryRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

// =====================================================
// API HEALTH CHECK
// =====================================================

app.get(
  "/api/health",
  (req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "PrimePlaceEstate API is running",
      environment: NODE_ENV,
    });
  }
);

// =====================================================
// PRODUCTION FRONTEND
// =====================================================

const clientPath = path.join(
  __dirname,
  "../client/dist"
);

app.use(
  express.static(clientPath)
);

// =====================================================
// ROOT
// =====================================================

app.get(
  "/",
  (req, res) => {
    res.sendFile(
      path.join(
        clientPath,
        "index.html"
      ),
      (error) => {
        if (error) {
          return res
            .status(200)
            .json({
              success: true,
              message:
                "PrimePlaceEstate API is running",
            });
        }
      }
    );
  }
);

// =====================================================
// REACT ROUTER FALLBACK
// =====================================================

app.get(
  "/{*splat}",
  (req, res, next) => {
    // Never send API requests to React.
    if (
      req.path.startsWith("/api/")
    ) {
      return next();
    }

    res.sendFile(
      path.join(
        clientPath,
        "index.html"
      ),
      (error) => {
        if (error) {
          return next(error);
        }
      }
    );
  }
);

// =====================================================
// ERROR HANDLER
// =====================================================

app.use(
  (err, req, res, next) => {
    const statusCode =
      err.statusCode || 500;

    const message =
      err.message ||
      "Internal Server Error";

    console.error(
      "SERVER ERROR:",
      err
    );

    return res
      .status(statusCode)
      .json({
        success: false,
        statusCode,
        message,
      });
  }
);

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(
      "✅ Connected to MongoDB"
    );

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `🚀 PrimePlaceEstate running on port ${PORT}`
        );
      }
    );
  })
  .catch((error) => {
    console.error(
      "❌ MongoDB connection error:",
      error
    );

    process.exit(1);
  });