import express from "express";
import {
    createCourseController,
    getAllCourse,
    getCourseController,
    // assignment,
    // assignedCourse
} from "../controllers/courseController.js";

const router = express.Router();

import cloudinary from "cloudinary"
import ExpressFormidable from "express-formidable"
// import userPCSModel from "../models/userPCSModel.js";
// import courseModel from "../models/courseModel.js";

cloudinary.config({
    cloud_name: 'dalfbjhy3',
    api_key: '533168436212999',
    api_secret: '5F5darjLiIxnuxadrupUkQW7XIc'
});



router.post('/createCourse', createCourseController);
router.get('/allCourse', getAllCourse);
router.get('/get-dashboard', getCourseController);

// router.post("/assignments", assignment);

// Route to get assigned courses for a user
// router.get("/:id/assigned-courses", assignedCourse);


router.post("/upload", ExpressFormidable({ maxFieldsSize: 5 * 2024 * 2024 }), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        })

    } catch (error) {
        console.error(error.message);
    }
})


export default router;