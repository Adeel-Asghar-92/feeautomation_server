import { ObjectId } from "mongoose";

import { ContactUs } from "../models";

export const contactUsService = {
  create: ({
    firstName,
    LastName,
    mail,
    phoneNo,
    reason,
    message,
  }: {
    firstName: String;
    LastName: String;
    mail: String;
    phoneNo: String;
    reason: String;
    message: String;
  }) =>
    new ContactUs({
      firstName,
      LastName,
      mail,
      phoneNo,
      reason,
      message,
    }).save(),

  getById: (id: ObjectId) => ContactUs.findById(id),

  getAll: () => ContactUs.find(),

  updateById: (
    id: ObjectId,
    firstName: string,
    LastName: string,
    mail: string,
    phoneNo: string,
    reason: string,
    message: string
  ) => {
    const data = [
      { _id: id },
      { firstName, LastName, mail, phoneNo, reason, message },
    ];
    let params = null;
    params = data;

    return ContactUs.updateOne(...params);
  },

  deleteById: (id: ObjectId) => ContactUs.deleteOne({ _id: id }),
};
