import mongoose from 'mongoose';

// Define schema for user request
const userRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: String, required: true },
  certificate: { type: String, required: true },
  program: { type: String, required: true },
  status: {
    type: [String],
    required: true,
    enum: ["Verified", "Not verified", "Denied"],
    default: ["Not verified"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }
});

// Create a model for user request
const RequestModel = mongoose.model('UserRequest', userRequestSchema, "user_requests");
export default RequestModel;
