import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  profilePicture: string;
  userName: string;
  contactInfo: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String, required: false },
  userName: { type: String, required: false },
  contactInfo: { type: String, required: false },
});

export default mongoose.model<IUser>("User", UserSchema);
