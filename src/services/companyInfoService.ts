import { ObjectId } from "mongoose";

import { CompanyInfo } from "../models";

export const companyInfoService = {
  create: ({
    address,
    direction,
    mail,
    phoneNo,
  }: {
    address: string;
    direction: string;
    mail: string;
    phoneNo: string;
  }) =>
    new CompanyInfo({
      address,
      direction,
      mail,
      phoneNo,
    }).save(),

  getById: (id: ObjectId) => CompanyInfo.findById(id),

  getAll: () => CompanyInfo.find(),
  getFirst: () => CompanyInfo.findOne().exec(),

  updateById: (
    id: ObjectId,
    address: string,
    address_ar: string,
    direction: string,
    mail: string,
    phoneNo: string
  ) => {
    const data = [
      { _id: id },
      { address, address_ar, direction, mail, phoneNo },
    ];
    let params = null;
    params = data;

    return CompanyInfo.updateOne(...params);
  },

  deleteById: (id: ObjectId) => CompanyInfo.deleteOne({ _id: id }),
};
