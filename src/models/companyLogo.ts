import { Schema, model } from "mongoose";

import { ICompanyLogo } from "../contracts/companyLogo";

const schema = new Schema<ICompanyLogo>(
  {
    logo: String,
  },
  { timestamps: true }
);

export const CompanyLogo = model<ICompanyLogo>("CompanyLogo", schema);
