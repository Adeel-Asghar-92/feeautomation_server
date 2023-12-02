import { ObjectId } from "mongoose";

import { OpportunityRequest } from "../models";

export const opportunityRequestService = {
  create: ({
    firstName,
    LastName,
    mail,
    phoneNo,
    industry,
    country,
    cv,
  }: {
    firstName: string;
    LastName: string;
    mail: string;
    phoneNo: string;
    industry: string;
    country: string;
    cv: string;
  }) =>
    new OpportunityRequest({
      firstName,
      LastName,
      mail,
      phoneNo,
      industry,
      country,
      cv,
    }).save(),

  getById: (id: ObjectId) => OpportunityRequest.findById(id),

  getAll: () => OpportunityRequest.find(),

  updateById: (
    id: ObjectId,
    firstName: string,
    LastName: string,
    mail: string,
    phoneNo: string,
    industry: string,
    country: string,
    cv: string
  ) => {
    const data = [
      { _id: id },
      { firstName, LastName, mail, phoneNo, industry, country, cv },
    ];
    let params = null;
    params = data;

    return OpportunityRequest.updateOne(...params);
  },
  deleteById: (id: ObjectId) => OpportunityRequest.deleteOne({ _id: id }),
};
