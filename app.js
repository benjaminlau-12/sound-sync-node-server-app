import express from 'express';
import Songs from './Songs/routes.js';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from './users/routes.js';
import session from "express-session";
import "dotenv/config";
import LikesRoutes from './likes/routes.js';

const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/soundsync';
mongoose.connect(CONNECTION_STRING);

app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
  
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
Songs(app);
app.listen(4000);
LikesRoutes(app);

