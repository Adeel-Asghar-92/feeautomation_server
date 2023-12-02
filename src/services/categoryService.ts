import { ObjectId } from "mongoose";

import { Category } from "../models";

export const categoryService = {
  create: ({
    name_en,
    name_ar,
    type,
    brand,
  }: {
    name_en: string;
    name_ar: string;
    type: string;
    brand: string;
  }) =>
    new Category({
      name_en,
      name_ar,
      type,
      brand,
    }).save(),

  getById: (id: ObjectId) => Category.findById(id),

  getByName: (name: string) => Category.findOne({ name }),
  getAll: () => Category.find().populate("brand", ["name", "name_ar"]),

  isExistByName: (Name: string) => Category.exists({ Name }),

  updateCategoryById: (
    id: ObjectId,
    name_en: string,
    name_ar: string,
    type: string,
    brand: ObjectId
  ) => {
    const data = [{ _id: id }, { name_en, name_ar, type, brand }];
    let params = null;
    params = data;

    return Category.updateOne(...params);
  },

  deleteById: (id: ObjectId) => Category.deleteOne({ _id: id }),
};
