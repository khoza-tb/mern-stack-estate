import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.models.js";

dotenv.config({
  path: "./api/.env",
});

const makeAdmin = async () => {
  try {
    // =====================================================
    // CONNECT TO MONGODB
    // =====================================================

    if (!process.env.MONGO) {
      throw new Error(
        "MONGO is not configured in api/.env"
      );
    }

    await mongoose.connect(process.env.MONGO);

    console.log("MongoDB connected");

    // =====================================================
    // ADMIN ACCOUNT
    // =====================================================

    const email = "admin@primeplaceestate.com";

    const password = "Admin@12345";

    // =====================================================
    // FIND EXISTING USER
    // =====================================================

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      console.log(
        "================================"
      );

      console.log(
        "ADMIN ACCOUNT NOT FOUND"
      );

      console.log(
        "Email:",
        email
      );

      console.log(
        "Create a normal user account first,"
      );

      console.log(
        "then run this script again."
      );

      console.log(
        "================================"
      );

      await mongoose.disconnect();

      return;
    }

    console.log(
      "================================"
    );

    console.log(
      "EXISTING ACCOUNT FOUND"
    );

    console.log(
      "Username:",
      user.username
    );

    console.log(
      "Email:",
      user.email
    );

    console.log(
      "Current role:",
      user.role
    );

    // =====================================================
    // HASH NEW ADMIN PASSWORD
    // =====================================================

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // =====================================================
    // PROMOTE ACCOUNT TO ADMIN
    // =====================================================

    user.role = "admin";
    user.password = hashedPassword;

    await user.save();

    // =====================================================
    // SUCCESS
    // =====================================================

    console.log(
      "================================"
    );

    console.log(
      "ADMIN ACCOUNT UPDATED SUCCESSFULLY"
    );

    console.log(
      "================================"
    );

    console.log(
      "Email:",
      user.email
    );

    console.log(
      "Role:",
      user.role
    );

    console.log(
      "Password has been reset and securely hashed."
    );

    console.log(
      "================================"
    );

    console.log(
      "You can now sign in at:"
    );

    console.log(
      "http://localhost:5173/admin/signin"
    );

    console.log(
      "================================"
    );

    await mongoose.disconnect();

    console.log(
      "MongoDB disconnected"
    );
  } catch (error) {
    console.error(
      "MAKE ADMIN ERROR:",
      error
    );

    try {
      await mongoose.disconnect();
    } catch {
      // Ignore disconnect errors
    }

    process.exit(1);
  }
};

makeAdmin();