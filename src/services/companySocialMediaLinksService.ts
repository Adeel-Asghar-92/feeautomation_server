import { ObjectId } from "mongoose";

import { CompanySocialMediaLinks } from "../models";

export const companySocialMediaLinksService = {
  create: ({
    facebook,
    instagram,
    twitter,
    linkedin,
  }: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  }) =>
    new CompanySocialMediaLinks({
      facebook,
      instagram,
      twitter,
      linkedin,
    }).save(),

  getById: (id: ObjectId) => CompanySocialMediaLinks.findById(id),
  getFirst: () => CompanySocialMediaLinks.findOne().exec(),

  getAll: () => CompanySocialMediaLinks.find(),

  updateById: (
    id: ObjectId,
    facebook: string,
    instagram: string,
    twitter: string,
    linkedin: string
  ) => {
    const data = [{ _id: id }, { facebook, instagram, twitter, linkedin }];
    let params = null;
    params = data;

    return CompanySocialMediaLinks.updateOne(...params);
  },

  deleteById: (id: ObjectId) => CompanySocialMediaLinks.deleteOne({ _id: id }),
};
