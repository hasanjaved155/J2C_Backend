import courseModel from "../model/courseModel.js";

export const createCourseController = async (req, res) => {
    try {
        const { path, courseName, folderId, image, courseTitle, role, authorName, courseInfo } = req.body;

        if (!path) {
            return res.send({ message: 'Path is Required' })
        }

        if (!courseName) {
            return res.send({ message: 'Course Name is Required' })
        }
        if (!folderId) {
            return res.send({ message: 'Playlist Name is Required' })
        }
        if (!image) {
            return res.send({ message: 'Image is Required' })
        }

        if (!authorName) {
            return res.send({ message: 'AuthorName is Required' })
        }
        if (!courseInfo) {
            return res.send({ message: 'Course Information is Required' })
        }

        if (!courseTitle) {
            return res.send({ message: 'courseTitle is Required' })
        }
        if (!role || !role.length) {
            return res.status(400).send({ message: "At least one role is required" });
        }


        const existingCourse = await courseModel.findOne({ path })
        //existing dashboard
        if (existingCourse) {
            return res.status(200).send({
                success: false,
                message: 'Course already exist'
            })
        }

        const course = new courseModel({ path, courseName, folderId, image, courseTitle, role, authorName, courseInfo });
        await course.save();

        res.status(201).send({
            success: true,
            message: 'Course Created Successfully',
            course
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while creating course',
            error
        })
    }
};


export const getAllCourse = async (req, res) => {
    try {
        // Add logic here to fetch the dashboard data from the database
        const playlist = await courseModel.find({});

        res.status(200).send({
            success: true,
            message: 'Fetched playlist successfully',
            playlist
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching playlist',
            error
        });
    }
};


export const getCourseController = async (req, res) => {
    try {
        let dashboards;

        // Check if there's a search term in the request query
        if (req.query.search) {
            const searchTerm = req.query.search;
            // Use a case-insensitive regular expression to search for dashboards containing the search term
            dashboards = await courseModel.find({
                courseName: { $regex: searchTerm, $options: "i" },
            });
        } else {
            // If no search term provided, fetch all dashboards
            dashboards = await courseModel.find({});
        }

        res.status(200).send({
            success: true,
            message: "Fetched dashboards successfully",
            dashboards,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching dashboards",
            error,
        });
    }
};

// export const assignment = async (req, res) => {
//     try {
//         const { userId, courseId } = req.body;
//         const user = await userPCSModel.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Check if course exists
//         const course = await courseModel.findById(courseId);

//         if (!course) {
//             return res.status(404).json({ message: "Course not found" });
//         }

//         if (!user.assignedCourses) {
//             user.assignedCourses = [];
//         }
//         // Check if the course is already assigned to the user
//         if (user.assignedCourses.includes(courseId)) {
//             return res
//                 .status(400)
//                 .json({ message: "Course is already assigned to the user" });
//         }
//         user.assignedCourses.push(courseId);
//         await user.save();

//         const courses = user.assignedCourses;

//         //await user.populate("assignedCourses").execPopulate();
//         res.status(201).send({
//             success: true,
//             message: "courses Assigned successfully",
//             courses,
//         });
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json({ message: err.message });
//     }
// }

// export const assignedCourse = async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const user = await userPCSModel.findById(userId).populate("assignedCourses");
//         // console.log(user);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const course = user.assignedCourses;

//         res.status(200).send({
//             success: true,
//             message: "Fetched course successfully",
//             course,
//         });
//     } catch (error) {
//         console.error("Error fetching assigned courses:", error);
//         res.status(500).json({ message: "Error fetching assigned courses" });
//     }
// }