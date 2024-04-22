import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import dotenv from  'dotenv';
import usersRoutes from './routes/user.routes.js';
import requestRoutes from "./routes/request.routes.js";
import authenticate from "./middlewares/auth.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import loginRoutes from "./routes/user.routes.js"





// Load env variables
dotenv.config({path:".env.local"});

// create express app
const app = express();


// use middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// use routes
app.use('/api/user', usersRoutes);
app.use('/api/request', authenticate, requestRoutes);
app.use("/api/user", loginRoutes)


// error handling middleware
app.use(errorHandler);


// Connect to the database
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  
    // Start the server after the database connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Express server is running on port ${PORT} successfully!`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
  

