import express from "express";
import mongoose from "mongoose";
import User from "./Models/userSchema.js"
import bcrypt from "bcryptjs"
const app = express()
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const URI = "mongodb+srv://janisar:janisar110@jmdbpractice.6a4p5uw.mongodb.net"

mongoose.connect(URI);

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

app.get('/', (req, res) => res.send('Hello Janisar!'));


app.post("/api/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            res.json({
                message: "All fields are required",
                status: false
            })
            return;
        }


        const emailExist = await User.findOne({ email });

        if (emailExist !== null) {
            res.json({
                message: "Email already exist",
                status: false
            })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const obj = {
            ...req.body,
            password: hashPassword
        }

        const response = await User.create(obj);

        res.json({
            message: "Signup successfully",
            status: true
        })
        // console.log(response);


    } catch (error) {
        res.json({
            message: error.message,
            status: false
        })
    }
})


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {

            res.json({
                message: "All fields are required",
                status: false
            })
            return;
        }
        const emailExist = await User.findOne({ email });

        if (!emailExist){
            res.json({
                message: "Invalid email or pasword",
                status: false
            })
            return;
        }

        // console.log(emailExist);

        const comparePasword = await bcrypt.compare(password, emailExist.password);

        if (!comparePasword) {
            res.json({
                message: "Invalid password",
                status: false
            })
            return;
        }

            res.json({
                message: "Login successfully",
                status: true
            })


    }
    catch (error) {
        res.json({
            message: error.message,
            status: false
        })
    }


})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))