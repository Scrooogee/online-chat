import mongoose, { Schema, Document } from "mongoose";
import  generatePasswordHash from "../utils/generatePasswordHash.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: "Email address is required",
      unique: true,
    },
    fullname: {
      type: String,
      required: "Fullname is required",
    },
    passwordHash: {
      type: String,
      required: "Password is required",
    },
    avatar: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  user.password = await generatePasswordHash(user.password);
  user.confirm_hash = await generatePasswordHash(new Date().toString());
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
