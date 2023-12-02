import { Schema, model } from "mongoose";

import { IBrand } from "../contracts/brand";

const schema = new Schema<IBrand>(
  {
    name: String,
    name_ar: String,
    image: String,
    type: String,
  },
  { timestamps: true }
);

export const Brand = model<IBrand>("Brand", schema);
