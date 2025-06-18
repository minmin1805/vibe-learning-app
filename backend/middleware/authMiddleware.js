import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if(!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        res.status(500).json({ message: "Internal server error, please authenticate", error: error.message });
    }
}