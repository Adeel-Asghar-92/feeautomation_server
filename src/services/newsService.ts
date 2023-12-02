import { ObjectId } from "mongoose";

import { News } from "../models";

export const newsService = {
  create: ({
    mail,
  }: // heading_en,
  // subHeading_en,
  // description_en,
  // heading_ar,
  // subHeading_ar,
  // description_ar,
  // image,
  {
    mail: String;
    // heading_en: String;
    // subHeading_en: String;
    // description_en: String;
    // heading_ar: String;
    // subHeading_ar: String;
    // description_ar: String;
    // image: String;
  }) =>
    new News({
      mail,
      // heading_en,
      // subHeading_en,
      // description_en,
      // heading_ar,
      // subHeading_ar,
      // description_ar,
      // image,
    }).save(),

  getById: (id: ObjectId) => News.findById(id),

  getAll: () => News.find(),

  updateById: (
    id: ObjectId,
    heading_en: String,
    subHeading_en: String,
    description_en: String,
    heading_ar: String,
    subHeading_ar: String,
    description_ar: String,
    image: String
  ) => {
    const data = [
      { _id: id },
      {
        heading_en,
        subHeading_en,
        description_en,
        heading_ar,
        subHeading_ar,
        description_ar,
        image,
      },
    ];
    let params = null;
    params = data;

    return News.updateOne(...params);
  },

  deleteById: (id: ObjectId) => News.deleteOne({ _id: id }),
};
