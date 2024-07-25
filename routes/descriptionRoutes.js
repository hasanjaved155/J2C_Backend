import express from 'express';
import Description from '../model/DescriptionModel.js'

const router = express.Router();

// Route to create a new description
router.post('/create-description', async (req, res) => {
    try {
        const { path, heading, paragraph, leftDescription, rightDescription } = req.body;

        const newDescription = new Description({
            path,
            heading,
            paragraph,
            leftDescription,
            rightDescription,
        });

        const description = await newDescription.save();
        res.status(201).json(description);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route to get a single description by path
router.get('/get-description/:path', async (req, res) => {
    try {
        const { path } = req.params;

        const description = await Description.findOne({ path });

        if (!description) {
            return res.status(404).send({
                success: false,
                message: "description not exist",
            });
        }

        return res.status(201).send({
            success: true,
            message: "description get successfully",
            description
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
