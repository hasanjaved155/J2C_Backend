import express from "express";

import BeInstructor from "../model/BeInstructor.js";
import InstructorFormModel from "../model/InstructorFormModel.js";

const router = express.Router();

router.post('/be-instructor', async (req, res) => {
    try {
        const { email, phone, domain, country, category, message } = req.body;
        // console.log(domain);
        // Find the registration document by ID
        const user = await BeInstructor.findOne({ email });
        if (user) {
            return res.status(201).send({ success: false, message: "email already exist" });
        }
        const instructor = new BeInstructor({
            email, phone, domain, category, country, message
        });
        // console.log(pcs360)

        await instructor.save();

        res.status(201).send({
            success: true,
            message: "send details successfully",
            instructor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Details",
            error,
        });
    }

});

router.get('/be-instructors', async (req, res) => {
    try {
        const instructors = await BeInstructor.find({});
        res.status(200).send({
            success: true,
            message: "All instructors fetched successfully",
            instructors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching instructors",
            error,
        });
    }
});


// PUT route to update instructor's access status
router.put('/be-instructor/access/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const instructor = await BeInstructor.findOne({ email });

        if (!instructor) {
            return res.status(404).send({
                success: false,
                message: "Instructor not found",
            });
        }

        instructor.access = !instructor.access;
        await instructor.save();

        res.status(200).send({
            success: true,
            message: "Instructor access status updated successfully",
            instructor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating instructor access status",
            error,
        });
    }
});


router.get('/checkInstructor/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const instructor = await BeInstructor.findOne({ email: email });
        if (instructor) {
            return res.status(200).json({
                success: true,
                isInstructor: true,
                instructor
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Instructor not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

router.post('/instructorform', async (req, res) => {
    const { email, title, learn, requirements, courseTarget, timeCommitment } = req.body;

    try {
        // Check if the email is already registered
        const existingForm = await InstructorFormModel.findOne({ email });

        if (existingForm) {
            // Update the existing document
            existingForm.title = title;
            existingForm.learn = learn;
            existingForm.requirements = requirements;
            existingForm.courseTarget = courseTarget;
            existingForm.timeCommitment = timeCommitment;

            const updatedForm = await existingForm.save();
            return res.status(200).send({
                success: true,
                message: "Details updated successfully",
                form: updatedForm
            });
        }

        // Create a new document if it doesn't exist
        const newForm = new InstructorFormModel({
            email,
            title,
            learn,
            requirements,
            courseTarget,
            timeCommitment,
        });

        const form = await newForm.save();
        res.status(201).send({
            success: true,
            message: "Details sent successfully",
            form
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/checkInstructorEnroll/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const instructor = await InstructorFormModel.findOne({ email: email });
        if (instructor) {
            return res.status(200).json({
                success: true,
                isInstructor: true,
                instructor
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'InstructorEnroll not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});




export default router;