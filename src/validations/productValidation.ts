import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";

export const productValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        !req.body.type ||
        !req.body.brand ||
        !req.body.category ||
        !req.body.name_en ||
        !req.body.name_ar ||
        !req.body.image ||
        !req.body.weight
        // !req.body.productNumber ||
        // !req.body.barcodeNumber ||
        // !req.body.productDescription_en ||
        // !req.body.productDescription_ar ||
        // !req.body.IngredientsList_en ||
        // !req.body.IngredientsList_ar ||
        // !req.body.warningInformation_en ||
        // !req.body.warningInformation_ar ||
        // !req.body.nameAndAddress_en ||
        // !req.body.nameAndAddress_ar ||
        // !req.body.countryOfOrigin_en ||
        // !req.body.countryOfOrigin_ar ||
        // !req.body.packagingMaterial_en ||
        // !req.body.packagingMaterial_ar ||
        // !req.body.dateMarkingAndInstructiosForStorageAndUse_en ||
        // !req.body.dateMarkingAndInstructiosForStorageAndUse_ar ||
        // !req.body.nutritionalFacts ||
        // !req.body.energy ||
        // !req.body.protein ||
        // !req.body.totalCarbohydrates ||
        // !req.body.totalSugar ||
        // !req.body.dietaryFiberTotalFat ||
        // !req.body.saturatedFat ||
        // !req.body.monounsaturatedFat ||
        // !req.body.polyunsaturatedFat ||
        // !req.body.transFat ||
        // !req.body.cholesterol ||
        // !req.body.iron ||
        // !req.body.folicAcid ||
        // !req.body.sodium ||
        // !req.body.thiamine ||
        // !req.body.riboflavin ||
        // !req.body.niacin ||
        // !req.body.vitaminD
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "One or more fields are missing",
          status: StatusCodes.BAD_REQUEST,
        });
      }
      return next();
    } catch (error) {
      winston.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        !req.body.id ||
        !req.body.type ||
        !req.body.brand ||
        !req.body.category ||
        !req.body.name_en ||
        !req.body.name_ar ||
        !req.body.image ||
        !req.body.weight
        // !req.body.productNumber ||
        // !req.body.barcodeNumber ||
        // !req.body.productDescription_en ||
        // !req.body.productDescription_ar ||
        // !req.body.IngredientsList_en ||
        // !req.body.IngredientsList_ar ||
        // !req.body.warningInformation_en ||
        // !req.body.warningInformation_ar ||
        // !req.body.nameAndAddress_en ||
        // !req.body.nameAndAddress_ar ||
        // !req.body.countryOfOrigin_en ||
        // !req.body.countryOfOrigin_ar ||
        // !req.body.packagingMaterial_en ||
        // !req.body.packagingMaterial_ar ||
        // !req.body.dateMarkingAndInstructiosForStorageAndUse_en ||
        // !req.body.dateMarkingAndInstructiosForStorageAndUse_ar ||
        // !req.body.nutritionalFacts ||
        // !req.body.energy ||
        // !req.body.protein ||
        // !req.body.totalCarbohydrates ||
        // !req.body.totalSugar ||
        // !req.body.dietaryFiberTotalFat ||
        // !req.body.saturatedFat ||
        // !req.body.monounsaturatedFat ||
        // !req.body.polyunsaturatedFat ||
        // !req.body.transFat ||
        // !req.body.cholesterol ||
        // !req.body.iron ||
        // !req.body.folicAcid ||
        // !req.body.sodium ||
        // !req.body.thiamine ||
        // !req.body.riboflavin ||
        // !req.body.niacin ||
        // !req.body.vitaminD
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "One or more fields are missing",
          status: StatusCodes.BAD_REQUEST,
        });
      }

      return next();
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST,
        });
      }

      return next();
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
