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
import userModel from "../model/userModel.js";
import courseModel from "../model/courseModel.js";
import { verifyJWT } from "../middlewares/authMiddlewares.js";
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

router.post('/purchase/:courseId', verifyJWT, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        const course = await courseModel.findById(req.params.courseId);

        if (!user || !course) {
            return res.status(404).send({
                success: false,
                message: 'User or Course not found'
            });
        }

        // Check if user already purchased the course
        if (user.myCourse.includes(course._id)) {
            return res.status(400).send({
                success: false,
                message: 'Course already purchased'
            });
        }

        user.myCourse.push(course._id);
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Course purchased successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

router.get('/my-courses', verifyJWT, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate('myCourse');
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Courses fetched successfully',
            courses: user.myCourse
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});


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