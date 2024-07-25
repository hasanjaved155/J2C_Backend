import express from "express";
import { sendHelpEmail } from "../controllers/mail-service.js";
import ContactModel from "../model/ContactModel.js";

const router = express.Router();

router.post("/help-desk", async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        // console.log("Received request:", { firstName, lastName, email, message });

        if (!email) {
            console.warn("Invalid email:", email);
            return res.status(400).send({
                success: false,
                message: "Invalid email",
            });
        }

        // Find and update the existing contact or create a new one
        const help = await ContactModel.findOneAndUpdate(
            { email: email },
            { $set: { firstName, lastName, message } },
            { new: true, upsert: true }
        );
        // console.log("Saved contact to database:", help);

        const query =
            `My name is ${firstName} ${lastName} \n\n` +
            `and my query is \n\n ${message}`;

        await sendHelpEmail(email, query);
        // console.log("Sent help email to:", email);

        res.status(200).send({ success: true, message: "Email sent successfully." });
    } catch (error) {
        console.error("Error in /help-desk route:", error);
        res.status(500).send({
            success: false,
            message: "Error in help desk process",
            error: error.message,
        });
    }
});


router.get('/all-help', async (req, res) => {
    try {
        const help = await ContactModel.find({})
        res.status(200).send({
            success: true,
            message: "Fetched all help successfully",
            help,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching help",
            error,
        });
    }


})



export default router;
