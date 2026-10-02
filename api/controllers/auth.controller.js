import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { errorHandler } from "../utils/error.js";

// =====================================================
// COOKIE OPTIONS
// =====================================================

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

// =====================================================
// CREATE JWT TOKEN
// =====================================================

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured in the environment."
    );
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      _id: user._id.toString(),
      role: user.role || "user",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// =====================================================
// REMOVE PASSWORD FROM USER
// =====================================================

const removePassword = (user) => {
  if (!user) {
    return null;
  }

  const userObject = user.toObject
    ? user.toObject()
    : { ...user };

  const { password, ...userData } = userObject;

  return userData;
};

// =====================================================
// SET AUTH COOKIE
// =====================================================

const setAuthCookie = (res, token) => {
  res.cookie("access_token", token, COOKIE_OPTIONS);

  return res;
};

// =====================================================
// TEST AUTH ROUTE
// =====================================================

export const test = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Auth route is working!",
  });
};

// =====================================================
// SIGN UP - NORMAL USER ONLY
// =====================================================
// PUBLIC SIGNUP CAN NEVER CREATE AN ADMIN.
// =====================================================

export const signup = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return next(
        errorHandler(
          400,
          "Please provide username, email and password."
        )
      );
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (
      !normalizedUsername ||
      !normalizedEmail ||
      !cleanPassword
    ) {
      return next(
        errorHandler(
          400,
          "Please provide valid username, email and password."
        )
      );
    }

    if (cleanPassword.length < 6) {
      return next(
        errorHandler(
          400,
          "Password must be at least 6 characters."
        )
      );
    }

    // ---------------------------------------------------
    // CHECK EXISTING USER
    // ---------------------------------------------------

    const existingUser = await User.findOne({
      $or: [
        {
          username: normalizedUsername,
        },
        {
          email: normalizedEmail,
        },
      ],
    });

    if (existingUser) {
      if (
        existingUser.email === normalizedEmail
      ) {
        return next(
          errorHandler(
            400,
            "Email already exists."
          )
        );
      }

      return next(
        errorHandler(
          400,
          "Username already exists."
        )
      );
    }

    // ---------------------------------------------------
    // HASH PASSWORD
    // ---------------------------------------------------

    const hashedPassword = await bcrypt.hash(
      cleanPassword,
      10
    );

    // ---------------------------------------------------
    // ALWAYS CREATE NORMAL USER
    // ---------------------------------------------------

    const newUser = new User({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,

      // SECURITY:
      // Never accept role from req.body.
      role: "user",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return next(error);
  }
};

// =====================================================
// USER SIGN IN
// =====================================================

export const signin = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return next(
        errorHandler(
          400,
          "Please provide email and password."
        )
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (
      !normalizedEmail ||
      !cleanPassword
    ) {
      return next(
        errorHandler(
          400,
          "Please provide email and password."
        )
      );
    }

    const validUser = await User.findOne({
      email: normalizedEmail,
    });

    if (!validUser) {
      return next(
        errorHandler(
          401,
          "Wrong credentials."
        )
      );
    }

    // ---------------------------------------------------
    // ADMIN CANNOT USE NORMAL USER LOGIN
    // ---------------------------------------------------

    if (validUser.role === "admin") {
      return next(
        errorHandler(
          403,
          "Admin accounts must use the admin sign-in option."
        )
      );
    }

    if (!validUser.password) {
      return next(
        errorHandler(
          400,
          "This account does not have a password. Please use Google Sign In."
        )
      );
    }

    const validPassword = await bcrypt.compare(
      cleanPassword,
      validUser.password
    );

    if (!validPassword) {
      return next(
        errorHandler(
          401,
          "Wrong credentials."
        )
      );
    }

    const token = createToken(validUser);
    const userData = removePassword(validUser);

    return setAuthCookie(res, token)
      .status(200)
      .json({
        success: true,
        message: "Signed in successfully.",
        user: userData,
      });
  } catch (error) {
    console.error(
      "USER SIGNIN ERROR:",
      error
    );

    return next(error);
  }
};

// =====================================================
// ADMIN SIGN IN
// =====================================================

export const adminSignin = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return next(
        errorHandler(
          400,
          "Please provide admin email and password."
        )
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (
      !normalizedEmail ||
      !cleanPassword
    ) {
      return next(
        errorHandler(
          400,
          "Please provide admin email and password."
        )
      );
    }

    const admin = await User.findOne({
      email: normalizedEmail,
    });

    if (!admin) {
      return next(
        errorHandler(
          401,
          "Wrong admin credentials."
        )
      );
    }

    // ---------------------------------------------------
    // ONLY EXISTING ADMIN CAN USE THIS ENDPOINT
    // ---------------------------------------------------

    if (admin.role !== "admin") {
      return next(
        errorHandler(
          403,
          "You do not have administrator access."
        )
      );
    }

    if (!admin.password) {
      return next(
        errorHandler(
          400,
          "Admin account does not have a password."
        )
      );
    }

    const validPassword = await bcrypt.compare(
      cleanPassword,
      admin.password
    );

    if (!validPassword) {
      return next(
        errorHandler(
          401,
          "Wrong admin credentials."
        )
      );
    }

    const token = createToken(admin);
    const adminData = removePassword(admin);

    return setAuthCookie(res, token)
      .status(200)
      .json({
        success: true,
        message: "Admin signed in successfully.",
        user: adminData,
      });
  } catch (error) {
    console.error(
      "ADMIN SIGNIN ERROR:",
      error
    );

    return next(error);
  }
};

// =====================================================
// GOOGLE SIGN IN
// =====================================================

export const google = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      name,
      photo,
    } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim()
    ) {
      return next(
        errorHandler(
          400,
          "Google email is required."
        )
      );
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // ---------------------------------------------------
    // FIND EXISTING USER
    // ---------------------------------------------------

    let user = await User.findOne({
      email: normalizedEmail,
    });

    // ---------------------------------------------------
    // EXISTING USER
    // ---------------------------------------------------

    if (user) {
      if (user.role === "admin") {
        return next(
          errorHandler(
            403,
            "Admin accounts must use the admin sign-in option."
          )
        );
      }

      if (
        photo &&
        photo !== user.avatar
      ) {
        user.avatar = photo;

        await user.save();
      }

      const token = createToken(user);
      const userData = removePassword(user);

      return setAuthCookie(res, token)
        .status(200)
        .json({
          success: true,
          message: "Google sign in successful.",
          user: userData,
        });
    }

    // ---------------------------------------------------
    // GENERATE USERNAME
    // ---------------------------------------------------

    let baseUsername = name
      ? name
          .trim()
          .replace(/\s+/g, "")
          .toLowerCase()
      : "googleuser";

    baseUsername = baseUsername.replace(
      /[^a-zA-Z0-9]/g,
      ""
    );

    if (!baseUsername) {
      baseUsername = "googleuser";
    }

    let username = "";
    let usernameExists = true;

    while (usernameExists) {
      const randomNumber = Math.floor(
        10000 + Math.random() * 90000
      );

      username = `${baseUsername}${randomNumber}`;

      const existingUsername =
        await User.findOne({
          username,
        });

      usernameExists = Boolean(
        existingUsername
      );
    }

    // ---------------------------------------------------
    // RANDOM PASSWORD
    // ---------------------------------------------------

    const generatedPassword =
      crypto.randomBytes(32).toString("hex");

    const hashedPassword =
      await bcrypt.hash(
        generatedPassword,
        10
      );

    // ---------------------------------------------------
    // CREATE NORMAL GOOGLE USER
    // ---------------------------------------------------

    user = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,

      avatar:
        photo ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",

      // SECURITY:
      // Google signup can NEVER create admin.
      role: "user",
    });

    await user.save();

    const token = createToken(user);
    const userData = removePassword(user);

    return setAuthCookie(res, token)
      .status(200)
      .json({
        success: true,
        message: "Google sign in successful.",
        user: userData,
      });
  } catch (error) {
    console.error(
      "GOOGLE SIGN IN ERROR:",
      error
    );

    return next(error);
  }
};

// =====================================================
// SIGN OUT
// =====================================================

export const signOut = (req, res, next) => {
  try {
    // ---------------------------------------------------
    // EXPLICITLY CLEAR THE SAME COOKIE
    // USED DURING LOGIN
    // ---------------------------------------------------

    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    console.log(
      "AUTH COOKIE CLEARED"
    );

    return res.status(200).json({
      success: true,
      message: "Signed out successfully.",
    });
  } catch (error) {
    console.error(
      "SIGNOUT ERROR:",
      error
    );

    return next(error);
  }
};