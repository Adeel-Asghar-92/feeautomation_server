import { ObjectId } from "mongoose";

import { Brand } from "../models";

export const brandService = {
  create: ({
    name, name_ar, image, type,
  }: {
    name: String;
    name_ar: String;
    image: String;
    type: String;
  }) =>
    new Brand({
      name, name_ar, image, type,
    }).save(),

  getById: (brandId: ObjectId) => Brand.findById(brandId),

  getByName: (name: string) => Brand.findOne({ name }),

  getAll: () => Brand.find().sort({index: 1}),

  isExistByName: (name: string) => Brand.exists({ name }),

  updateBrandNameById: (
    brandId: ObjectId,
    name: string,
    name_ar: string,
    image: string,
    type: string,) => {
    const data = [{ _id: brandId }, { name, name_ar, image, type }];
    let params = null;
    params = data;

    return Brand.updateOne(...params);
  },

  deleteById: (brandId: ObjectId) => Brand.deleteOne({ _id: brandId }),
};
