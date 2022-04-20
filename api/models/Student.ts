import mongoose, { Schema, Document } from "mongoose";
import { Student } from "../types";

const Student = new Schema({
  name: { type: String, required: true },
  paternalSurname: { type: String, required: true },
  maternalSurname: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<Student>("Student", Student);