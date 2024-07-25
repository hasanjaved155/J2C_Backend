import express from "express";
import Review from "../model/Review.js";
import courseModel from "../model/courseModel.js";

const router = express.Router();

router.post('/:id/reviews', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, rating, comment } = req.body;

        // Create a new review
        const review = new Review({ rating, comment, username });
        await review.save();

        // Find the product by ID
        const product = await courseModel.findById(id);
        if (!product) {
            return res.status(200).send({
                success: false,
                message: "Product not found"
            });
        }

        // Push the newly created review into the product's reviews array
        product.reviews.push(review);
        await product.save();

        res.status(200).send({
            success: true,
            message: "Review Created Successfully"
        });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while creating the review"
        });
    }
});

router.get('/:id/reviews', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the playlist by ID
        const playlist = await courseModel.findById(id).populate('reviews');
        if (!playlist) {
            return res.status(404).send({
                success: false,
                message: "Playlist not found"
            });
        }

        const reviews = playlist.reviews;
        // Calculate average rating
        let totalRating = 0;
        for (const review of reviews) {
            totalRating += review.rating;
        }
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        playlist.finalRating = averageRating;

        await playlist.save();


        res.status(200).send({
            success: true,
            reviews,
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while fetching the reviews"
        });
    }
});


export default router;
