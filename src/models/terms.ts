import { Schema, model } from "mongoose";

import { ITerms } from "../contracts/terms";

const schema = new Schema<ITerms>(
  {
    terms: Array,
    privacy: Array,
  },
  { timestamps: true }
);

export const Terms = model<ITerms>("Terms", schema);
