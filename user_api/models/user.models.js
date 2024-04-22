import { Schema, model } from "mongoose";

//Define Students Schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: String, default: false },
});

// Export request model based on  the schema created above.
const UserModel = model("User", userSchema, "users");
export default UserModel;
