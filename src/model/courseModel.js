import mongoose from "mongoose";

let courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },

  status: {
    type: Number,
    required: true,
    default: 1,
  },
  teacher_id: {
    type: mongoose.Schema.ObjectId,
    ref: "user_model",
    required: true,
  },
});
export default mongoose.model("course", courseSchema);
