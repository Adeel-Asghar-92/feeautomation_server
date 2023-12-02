import { Schema, model } from "mongoose";

import { IContactUs } from "../contracts/contactUs";

const schema = new Schema<IContactUs>(
  {
    firstName: String,
    LastName: String,
    mail: String,
    phoneNo: String,
    reason: String,
    message: String,
  },
  { timestamps: true }
);

export const ContactUs = model<IContactUs>("ContactUs", schema);
