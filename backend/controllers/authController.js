import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      user: newUser.getPublicProfile(),
      token,
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });
      
        if (!foundUser) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
      
        const isMatch = await foundUser.comparePassword(password);
      
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: "Invalid password",
          });
        }
      
        const token = jwt.sign(
          {
            userId: foundUser._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
      
        res.status(200).json({
          user: foundUser.getPublicProfile(),
          token,
          success: true,
          message: "Login successful",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }
};

// Get Profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if(!user) {
            return res.status(404).json({
                success: false,
            })
        }
        
        res.status(200).json({
            success: true,
            user: user.getPublicProfile(),
            message: "Profile fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user.userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if(email) {
            const existingEmail = await User.findOne({ email });

            if(existingEmail && existingEmail._id.toString() !== user._id.toString()) {
                return res.status(400).json({
                    success: false,
                })
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({
            success: true,
            user: user.getPublicProfile(),
            message: "Profile updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Profile update failed",
            error: error.message,
        });
    }
}

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message,
        });
    }
}