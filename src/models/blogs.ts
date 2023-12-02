import { Schema, model } from "mongoose";

import { IBlog } from "../contracts/blog";

const schema = new Schema<IBlog>(
  {
    title_ar: String,
    title_en: String,
    description_ar: String,
    description_en: String,
    introduction_ar: String,
    introduction_en: String,
    whatYouNeed_ar: String,
    whatYouNeed_en: String,
    conclusion_ar: String,
    conclusion_en: String,
    image: String,
    createby: String,
    designation: String,
    featured: Boolean,
  },
  { timestamps: true }
);

export const Blog = model<IBlog>("Blog", schema);
