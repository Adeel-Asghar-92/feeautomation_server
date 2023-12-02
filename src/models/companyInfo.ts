import { Schema, model } from "mongoose";

import { ICompanyInfo } from "../contracts/companyInfo";

const schema = new Schema<ICompanyInfo>(
  {
    address: String,
    address_ar: String,
    direction: String,
    mail: String,
    phoneNo: String,
  },
  { timestamps: true }
);

export const CompanyInfo = model<ICompanyInfo>("CompanyInfo", schema);
