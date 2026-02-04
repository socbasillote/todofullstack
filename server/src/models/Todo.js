import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
    tag: {
      type: String,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Todo", todoSchema);
