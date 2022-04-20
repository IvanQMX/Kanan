import mongoose, { Schema, Document } from "mongoose";
import { Lesson } from "../types";

const Lesson = new Schema({
  group: { type: String, required: true },
  subject: { type: String, required: true },
  days: [{ dayIndex: { type: Number }, time: { type: String } }],
});

export default mongoose.model<Lesson>("Lesson", Lesson);
