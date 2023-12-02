import { Schema, model } from "mongoose";

import { ICompanySocialMediaLinks } from "../contracts/companySocialMediaLinks";

const schema = new Schema<ICompanySocialMediaLinks>(
  {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
  },
  { timestamps: true }
);

export const CompanySocialMediaLinks = model<ICompanySocialMediaLinks>(
  "CompanySocialMediaLinks",
  schema
);
