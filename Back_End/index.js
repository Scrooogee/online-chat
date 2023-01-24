import express from "express";
import mongoose from "mongoose";
import { Login, Registration } from "./controllers/UserControllers.js";
import { RegValidation } from "./validations/index.js";

mongoose.connect('mongodb+srv://admin:admin@cluster0.texvksr.mongodb.net/chat?retryWrites=true&w=majority').then(() => console.log('DB is OK')).catch((err) => console.log(err))

const app = express();
app.use(express.json());

app.post('/auth/signup', RegValidation, Registration);
app.get('/auth', Login);

app.listen(4444, (err) => err ? console.log(err) : console.log('Server is working'))