import { Schema, model } from "mongoose";

import { ICompanyVideo } from "../contracts/companyVideo";

const schema = new Schema<ICompanyVideo>(
  {
    video: String,
  },
  { timestamps: true }
);

export const CompanyVideo = model<ICompanyVideo>("CompanyVideo", schema);
