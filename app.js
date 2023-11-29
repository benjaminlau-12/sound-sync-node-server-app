import express from 'express';
import Songs from './Songs/routes.js';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
Songs(app);
app.listen(4000);

