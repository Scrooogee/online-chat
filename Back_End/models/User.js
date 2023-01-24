import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true
        },
        userImg: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', UserShema);