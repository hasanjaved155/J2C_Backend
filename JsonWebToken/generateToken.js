import userModel from "../model/userModel.js"
import { generateAccessToken, generateRefreshToken } from "./jsonWebToken.js"

export const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await userModel.findById(userId)
        const accessToken = await generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user)

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong while generating referesh and access token",
            error,
        });
    }
}