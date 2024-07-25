import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';


export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log(token)

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized request: No token provided",
            });
        }

        // Check if ACCESS_TOKEN_SECRET is set
        if (!process.env.ACCESS_TOKEN_SECRET) {
            console.error('ACCESS_TOKEN_SECRET environment variable is not set');
            return res.status(500).send({
                success: false,
                message: "Internal server error",
            });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            console.error('Token verification failed:', err.message);
            return res.status(401).send({
                success: false,
                message: "Invalid Access Token",
            });
        }

        const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid Access Token: User not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Unexpected error during token verification:', error);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};