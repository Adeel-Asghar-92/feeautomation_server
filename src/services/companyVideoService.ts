import { ObjectId } from "mongoose";

import { CompanyVideo } from "../models";

export const companyVideoService = {
  create: ({ video }: { video: string }) =>
    new CompanyVideo({
      video,
    }).save(),

  getById: (id: ObjectId) => CompanyVideo.findById(id),

  getByName: (video: string) => CompanyVideo.findOne({ video }),

  getAll: () => CompanyVideo.find(),
  getFirst: () => CompanyVideo.findOne().exec(),

  isExistByVideo: (video: string) => CompanyVideo.exists({ video }),

  updateById: (id: ObjectId, video: string) => {
    const data = [{ _id: id }, { video }];
    let params = null;
    params = data;

    return CompanyVideo.updateOne(...params);
  },

  deleteById: (id: ObjectId) => CompanyVideo.deleteOne({ _id: id }),
};
