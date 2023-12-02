import { Schema, model } from "mongoose";

import { IOpportunityRequest } from "../contracts/opportunityRequest";

const schema = new Schema<IOpportunityRequest>(
  {
    firstName: String,
    LastName: String,
    mail: String,
    phoneNo: String,
    industry: String,
    country: String,
    cv: String,
  },
  { timestamps: true }
);

export const OpportunityRequest = model<IOpportunityRequest>(
  "OpportunityRequest",
  schema
);
