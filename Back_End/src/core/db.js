import mongoose from "mongoose";

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.texvksr.mongodb.net/chat?retryWrites=true&w=majority')
  .then(() => console.log('DB is OK')).catch((err) => console.log(err))
