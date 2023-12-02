import { Schema, model } from "mongoose";

import { INews } from "../contracts/news";

const schema = new Schema<INews>(
  {
    mail: String,
    // heading_en: String,
    // subHeading_en: String,
    // description_en: String,
    // heading_ar: String,
    // subHeading_ar: String,
    // description_ar: String,
    // image: String,
  },
  { timestamps: true }
);

export const News = model<INews>("News", schema);
