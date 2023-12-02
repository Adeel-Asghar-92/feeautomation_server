import { ObjectId } from "mongoose";

import { Terms } from "../models";

export const termsService = {
  createTerms: ({ terms }: { terms: string }) =>
    new Terms({
      terms,
    }).save(),
  createPrivacy: ({ privacy }: { privacy: string }) =>
    new Terms({
      privacy,
    }).save(),

  getById: (id: ObjectId) => Terms.findById(id),

  getByName: (terms: string) => Terms.findOne({ terms }),
  getFirst: () => Terms.findOne().exec(),

  getAll: () => Terms.find(),

  isExistByterms: (terms: string) => Terms.exists({ terms }),

  updateTermsById: (id: ObjectId, terms: any) => {
    const data = [{ _id: id }, { terms }];
    let params = null;
    params = data;

    return Terms.updateOne(...params);
  },
  updatePrivacyById: (id: ObjectId, privacy: any) => {
    const data = [{ _id: id }, { privacy }];
    let params = null;
    params = data;

    return Terms.updateOne(...params);
  },

  deleteById: (id: ObjectId) => Terms.deleteOne({ _id: id }),
};
