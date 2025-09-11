import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import UserModel from './models/User.js';



const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/booking');



// dotenv.config()


// app.use(bodyParser.json());



// const connectionString = process.env.MONGO_URI

// mongoose.connect(connectionString).then(
//     ()=>{
//         console.log("database connected")
//     }
// ).catch(
//     ()=>{
//         console.log("failed to connect to database")
//     }
// )

// Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "your-secret-key", // replace with process.env.JWT_SECRET in production
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});
 
app.listen(3000, () => {
  console.log('Server is running on port 3000')
});
