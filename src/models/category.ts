import { Schema, model } from "mongoose";

import { ICategory } from "../contracts/category";

const schema = new Schema<ICategory>(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    name_en: String,
    name_ar: String,
    type: String,
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", schema);
