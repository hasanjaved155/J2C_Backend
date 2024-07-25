import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../model/userModel.js";
import { generateAccessAndRefereshTokens } from "../JsonWebToken/generateToken.js";
import JWT from "jsonwebtoken";
// import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        console.log(name, email, password, confirmPassword);
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }


        // if (password !== confirmPassword) {
        //     return res.status(401).send({
        //         success: false,
        //         message: "Password is not match with Confirm Password",
        //     });
        // }

        //check user
        const existingUser = await userModel.findOne({ email });
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register pleasr login",
            });
        }
        // register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).send({
            success: true,
            message: "user Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        if (!accessToken || !refreshToken) {
            return res.status(500).send({
                success: false,
                message: "Failed to generate tokens",
            });
        }


        const loggedInUser = await userModel.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            // secure: true,
            sameSite: 'Strict'
        };

        // after making the httponly and secure to true . we will modify the cookies only by server side only


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .send({
                success: true,
                message: `user login successfully`,
                loggedInUser: {
                    _id: loggedInUser._id,
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                },
                accessToken,
                refreshToken,
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        // Add logic here to fetch the users data from the database
        const users = await userModel.find({});

        res.status(200).send({
            success: true,
            message: "Fetched users successfully",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching users",
            error,
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            // secure: true,
            sameSite: 'Strict'
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .send({
                success: true,
                message: "user logout successfully",
            })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while logout",
            error,
        });
    }
}

export const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req?.cookies?.refreshToken || req?.body?.refreshToken

    if (!incomingRefreshToken) {
        return res.status(401).send({
            success: false,
            message: "UnAutnorized Request",
        });
    }

    try {
        const decodedToken = JWT.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await userModel.findById(decodedToken?._id)

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid Refresh Token",
            });
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).send({
                success: false,
                message: "Refresh token is expired or used",
            });
        }

        const options = {
            httpOnly: true, // Ensure cookies are sent securely
            secure: true,
            sameSite: 'Strict' // Adjust according to your needs
        };

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)
        user.refreshToken = newRefreshToken;
        await user.save();


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .send({
                success: true,
                message: "Access token refreshed",
                accessToken,
                refreshToken: newRefreshToken,
            });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Invalid Refresh Token",
            error,
        });
    }

}


export const userRoleController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}