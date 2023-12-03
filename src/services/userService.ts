import { ClientSession, ObjectId } from "mongoose";

import { User } from "../models";

export const userService = {
  create: ({
    firstName,
    lastName,
    gender,
    email,
    grade,
    studentId,
    feeAccount,
    password,
    verified = false,
  }: {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    grade: string;
    studentId: string;
    feeAccount: any;
    password: string;
    verified?: boolean;
  }) =>
    // session?: ClientSession
    new User({
      firstName,
      lastName,
      gender,
      email,
      grade,
      studentId,
      password,
      verified,
      feeAccount,
    }).save(),

  getById: (userId: ObjectId) => User.findById(userId),

  getByEmail: (email: string) => User.findOne({ email }),

  isExistByEmail: (email: string) => User.exists({ email }),

  isExistByStudentId: (studentId: string) => User.exists({ studentId }),

  getAll: () => User.find(),
  find: (filter: any) =>
    User.aggregate([
      { $match: filter },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          gender: 1,
          grade: 1,
          studentId: 1,
          verified: 1,
          feeAccount: 1,
          balance: {
            $subtract: [
              {
                $reduce: {
                  input: "$feeAccount",
                  initialValue: 0,
                  in: {
                    $add: [
                      "$$value",
                      {
                        $toInt: {
                          $ifNull: [{ $toDouble: "$$this.paidAmount" }, 0],
                        },
                      },
                      {
                        $toInt: {
                          $ifNull: [{ $toDouble: "$$this.discount" }, 0],
                        },
                      },
                    ],
                  },
                },
              },
              {
                $reduce: {
                  input: "$feeAccount",
                  initialValue: 0,
                  in: {
                    $toInt: {
                      $ifNull: [{ $toDouble: "$$this.payableAmount" }, 0],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    ]),

  updatePasswordByUserId: (
    userId: ObjectId,
    password: string,
    session?: ClientSession
  ) => {
    const data = [{ _id: userId }, { password, resetPasswords: [] }];

    let params = null;

    if (session) {
      params = [...data, { session }];
    } else {
      params = data;
    }

    return User.updateOne(...params);
  },

  updateVerificationAndEmailByUserId: (
    userId: ObjectId,
    email: string,
    session?: ClientSession
  ) => {
    const data = [
      { _id: userId },
      { email, verified: true, verifications: [] },
    ];

    let params = null;

    if (session) {
      params = [...data, { session }];
    } else {
      params = data;
    }

    return User.updateOne(...params);
  },

  updateProfileByUserId: (
    userId: ObjectId,
    {
      firstName,
      lastName,
      gender,
      grade,
    }: { firstName: string; lastName: string; gender: string; grade: string },
    session?: ClientSession
  ) => {
    const data = [{ _id: userId }, { firstName, lastName, gender }];

    let params = null;

    if (session) {
      params = [...data, { session }];
    } else {
      params = data;
    }

    return User.updateOne(...params);
  },
  updateFeeAccount: (
    userId: ObjectId,
    { feeAccount }: { feeAccount: any },
    session?: ClientSession
  ) => {
    const data = [{ _id: userId }, { feeAccount }];

    let params = null;

    if (session) {
      params = [...data, { session }];
    } else {
      params = data;
    }

    return User.updateOne(...params);
  },

  updateEmailByUserId: (
    userId: ObjectId,
    email: string,
    session?: ClientSession
  ) => {
    const data = [{ _id: userId }, { email, verified: false }];

    let params = null;

    if (session) {
      params = [...data, { session }];
    } else {
      params = data;
    }

    return User.updateOne(...params);
  },

  deleteById: (userId: ObjectId, session?: ClientSession) =>
    User.deleteOne({ user: userId }, { session }),

  addResetPasswordToUser: async (
    {
      userId,
      resetPasswordId,
    }: {
      userId: ObjectId;
      resetPasswordId: ObjectId;
    },
    session?: ClientSession
  ) => {
    let options = {};

    if (session) {
      options = { session };
    }

    const user = await User.findOne({ _id: userId }, null, options);

    if (user) {
      if (!user.resetPasswords) {
        user.resetPasswords = [];
      }
      user.resetPasswords.push(resetPasswordId);
      await user.save({ session });
    }
  },

  addVerificationToUser: async (
    {
      userId,
      verificationId,
    }: {
      userId: ObjectId;
      verificationId: ObjectId;
    },
    session?: ClientSession
  ) => {
    let options = {};

    if (session) {
      options = { session };
    }

    const user = await User.findOne({ _id: userId }, null, options);

    if (user) {
      if (!user.verifications) {
        user.verifications = [];
      }
      user.verifications.push(verificationId);
      await user.save({ session });
    }
  },
};
