import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use(cors())

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString).then(
    ()=>{
        console.log("database connected")
    }
).catch(
    ()=>{
        console.log("failed to connect to database")
    }
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
