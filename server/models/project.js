import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    abstract: { type: String, required: true },
    authors: { type: [String], required: true, unique: true },
    tags: { type: [String] },
    createdBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
