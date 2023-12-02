import { ObjectId } from "mongoose";

import { CompanyLogo } from "../models";

export const companyLogoService = {
  create: ({ logo }: { logo: string }) =>
    new CompanyLogo({
      logo,
    }).save(),

  getById: (id: ObjectId) => CompanyLogo.findById(id),

  getByName: (logo: string) => CompanyLogo.findOne({ logo }),
  getFirst: () => CompanyLogo.findOne().exec(),

  getAll: () => CompanyLogo.find(),

  isExistBylogo: (logo: string) => CompanyLogo.exists({ logo }),

  updateById: (id: ObjectId, logo: string) => {
    const data = [{ _id: id }, { logo }];
    let params = null;
    params = data;

    return CompanyLogo.updateOne(...params);
  },

  deleteById: (id: ObjectId) => CompanyLogo.deleteOne({ _id: id }),
};
