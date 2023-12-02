import { ObjectId } from "mongoose";

import { Blog } from "../models";

export const blogService = {
  create: ({
    title_ar,
    title_en,
    description_ar,
    description_en,
    introduction_ar,
    introduction_en,
    whatYouNeed_ar,
    whatYouNeed_en,
    conclusion_ar,
    conclusion_en,
    createby,
    designation,
    image,
    featured,
  }: {
    title_ar: String;
    title_en: String;
    description_ar: String;
    description_en: String;
    introduction_ar: String;
    introduction_en: String;
    whatYouNeed_ar: String;
    whatYouNeed_en: String;
    conclusion_ar: String;
    conclusion_en: String;
    createby: String;
    designation: String;
    image: String;
    featured: String;
  }) =>
    new Blog({
      title_ar,
      title_en,
      description_ar,
      description_en,
      introduction_ar,
      introduction_en,
      whatYouNeed_ar,
      whatYouNeed_en,
      conclusion_ar,
      conclusion_en,
      createby,
      designation,
      image,
      featured,
    }).save(),

  getById: (id: ObjectId) => Blog.findById(id),

  getByName: (name: string) => Blog.findOne({ name }),

  getAll: () => Blog.find(),

  isExistByName: (Name: string) => Blog.exists({ Name }),

  updateById: (
    id: ObjectId,
    title_ar: string,
    title_en: string,
    description_ar: string,
    description_en: string,
    introduction_ar: string,
    introduction_en: string,
    whatYouNeed_ar: string,
    whatYouNeed_en: string,
    conclusion_ar: string,
    conclusion_en: string,
    createby: string,
    designation: string,
    image: string,
    featured: string
  ) => {
    const data = [
      { _id: id },
      {
        title_ar,
        title_en,
        description_ar,
        description_en,
        introduction_ar,
        introduction_en,
        whatYouNeed_ar,
        whatYouNeed_en,
        conclusion_ar,
        conclusion_en,
        createby,
        designation,
        image,
        featured,
      },
    ];
    let params = null;
    params = data;

    return Blog.updateOne(...params);
  },

  deleteById: (id: ObjectId) => Blog.deleteOne({ _id: id }),
};
