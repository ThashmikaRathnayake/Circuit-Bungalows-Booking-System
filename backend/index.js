import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from './router/userRouter.js';
import bookingRouter from './router/bookingRouter.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//middlewares
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value!= null) {
        const token = value.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(decoded == null){
                res.status(403).json({
                    message : "unauthorized"
                })
            }else{
                req.user = decoded
                next()
            }
            
        }
    )
        }else{
            next()
        }
        
    }
    
)


//database connection string
const connectionString = process.env.MONGO_URI // place the connection string in .env

mongoose.connect(connectionString).then(
    ()=>{
        console.log("database connected")
    }
).catch(
    ()=>{
        console.log("failed to connect to database")
    }
)

app.use('/users', userRouter);
app.use('/bookings',bookingRouter)
 
app.listen(3000, () => {
  console.log('Server is running on port 3000')
});
