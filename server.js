import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"


import connectDB from './config/db.js';

import UserRoutes from './routes/UserRoutes.js';
import CourseRoutes from './routes/CourseRoutes.js';
import CategoryRoutes from './routes/categoryRoutes.js';
import CartRoutes from './routes/CartRoutes.js';
import ContactHelpRoutes from './routes/ContactHelpRoutes.js'
import BeInstructorRoutes from './routes/BeInstructorRoutes.js';
import descriptionRoutes from './routes/descriptionRoutes.js';
import ReviewRoutes from './routes/ReviewRoutes.js';

dotenv.config();

connectDB();


const app = express();




const corsOptions = {
    origin: 'https://www.j2c.live',
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
// app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use("/auth", UserRoutes);
app.use("/course", CourseRoutes);
app.use("/category", CategoryRoutes);
app.use("/cart", CartRoutes);
app.use("/help", ContactHelpRoutes)
app.use("/teach", BeInstructorRoutes);
app.use("/description", descriptionRoutes);
app.use("/review", ReviewRoutes);

app.get("/", (req, res) => {
    res.send("abc");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
