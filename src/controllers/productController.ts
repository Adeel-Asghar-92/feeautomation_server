import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { IBodyRequest } from "../contracts/request";
import { productService } from "../services/productService";
import { Blog, Product } from "../models";

export const productController = {
  create: async (
    {
      body: {
        brand,
        category,
        name_en,
        name_ar,
        image,
        image_ar,
        nameHeading_ar,
        nameHeading_en,
        weight,
        feedBrand_en,
        feedBrand_ar,
        type,
        productNumber,
        barcodeNumber,
        productDescription_en,
        productDescription_ar,
        IngredientsList_en,
        IngredientsList_ar,
        warningInformation_en,
        warningInformation_ar,
        nameAndAddress_en,
        nameAndAddress_ar,
        countryOfOrigin_en,
        countryOfOrigin_ar,
        packagingMaterial_en,
        packagingMaterial_ar,
        dateMarkingAndInstructiosForStorageAndUse_en,
        dateMarkingAndInstructiosForStorageAndUse_ar,
        nutritionalFacts,
        energy,
        protein,
        totalCarbohydrates,
        totalSugar,
        dietaryFiber,
        totalFat,
        saturatedFat,
        monounsaturatedFat,
        polyunsaturatedFat,
        transFat,
        cholesterol,
        iron,
        folicAcid,
        sodium,
        thiamine,
        riboflavin,
        niacin,
        vitaminD,
      },
    }: Request,
    res: Response
  ) => {
    try {
      const isExist = await productService.isExist(
        name_en,
        name_ar,
        brand,
        category,
        type
      );
      if (isExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Product with that name already exist",
          status: StatusCodes.BAD_REQUEST,
        });
      }
      const product = await productService.create({
        brand,
        category,
        name_en,
        name_ar,
        image,
        image_ar,
        nameHeading_ar,
        nameHeading_en,
        weight,
        feedBrand_en,
        feedBrand_ar,
        type,

        productNumber,
        barcodeNumber,
        productDescription_en,
        productDescription_ar,
        IngredientsList_en,
        IngredientsList_ar,
        warningInformation_en,
        warningInformation_ar,
        nameAndAddress_en,
        nameAndAddress_ar,
        countryOfOrigin_en,
        countryOfOrigin_ar,
        packagingMaterial_en,
        packagingMaterial_ar,
        dateMarkingAndInstructiosForStorageAndUse_en,
        dateMarkingAndInstructiosForStorageAndUse_ar,
        nutritionalFacts,
        energy,
        protein,
        totalCarbohydrates,
        totalSugar,
        dietaryFiber,
        totalFat,
        saturatedFat,
        monounsaturatedFat,
        polyunsaturatedFat,
        transFat,
        cholesterol,
        iron,
        folicAcid,
        sodium,
        thiamine,
        riboflavin,
        niacin,
        vitaminD,
      });
      return res.status(StatusCodes.OK).json({
        data: { product },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  get: async ({ body: {} }: Request, res: Response) => {
    console.log("Run");

    try {
      const products = await productService.getAll();
      return res.status(StatusCodes.OK).json({
        data: { products },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
  getById: async ({ body: { id } }: Request, res: Response) => {
    try {
      const product = await productService.getById(id);
      return res.status(StatusCodes.OK).json({
        data: { product },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
  getall: async ({ body }: Request, res: Response) => {
    try {
      const searchText = body.search;
      const products = await Product.find({
        $or: [
          { name_en: new RegExp(searchText, "i") },
          { name_ar: new RegExp(searchText, "i") },
          { feedBrand_en: new RegExp(searchText, "i") },
          { feedBrand_ar: new RegExp(searchText, "i") },
        ],
      })
        .populate("category", ["name_en", "name_ar"])
        .populate("brand", "name");
      const blogs_ = await Blog.find({
        $or: [
          { title_ar: new RegExp(searchText, "i") },
          { title_en: new RegExp(searchText, "i") },
        ],
      });

      return res.status(StatusCodes.OK).json({
        data: { products, blogs_ },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });

      // const searchText = body.search;
      // const finalObj = {
      //   $or: [
      //     { name_en: new RegExp(searchText, 'i') },
      //     { name_ar: new RegExp(searchText, 'i') },
      //     { feedBrand_en: new RegExp(searchText, 'i') },
      //     { feedBrand_ar: new RegExp(searchText, 'i') }
      //   ],
      //   // deletedAt: null,
      //   // shop: req.body.shopId,
      // };

      // // const products = await Product.find({ objectsToFind });

      // const products = await Product.find({finalObj})
      //   // .populate("category", ["name_en", "name_ar"])
      //   // .populate("brand", "name");

      // // const products = await productService.getAll();
      // return res.status(StatusCodes.OK).json({
      //   data: { products },
      //   message: ReasonPhrases.OK,
      //   status: StatusCodes.OK,
      // });
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  update: async (
    {
      body: {
        id,
        brand,
        category,
        name_en,
        name_ar,
        image,
        image_ar,
        nameHeading_ar,
        nameHeading_en,
        weight,
        feedBrand_en,
        feedBrand_ar,
        type,
        productNumber,
        barcodeNumber,
        productDescription_en,
        productDescription_ar,
        IngredientsList_en,
        IngredientsList_ar,
        warningInformation_en,
        warningInformation_ar,
        nameAndAddress_en,
        nameAndAddress_ar,
        countryOfOrigin_en,
        countryOfOrigin_ar,
        packagingMaterial_en,
        packagingMaterial_ar,
        dateMarkingAndInstructiosForStorageAndUse_en,
        dateMarkingAndInstructiosForStorageAndUse_ar,
        nutritionalFacts,
        energy,
        protein,
        totalCarbohydrates,
        totalSugar,
        dietaryFiber,
        totalFat,
        saturatedFat,
        monounsaturatedFat,
        polyunsaturatedFat,
        transFat,
        cholesterol,
        iron,
        folicAcid,
        sodium,
        thiamine,
        riboflavin,
        niacin,
        vitaminD,
      },
    }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      const isExist = await productService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const product = await productService.updateProductById(
        id,
        brand,
        category,
        name_en,
        name_ar,
        image,
        image_ar,
        nameHeading_ar,
        nameHeading_en,
        weight,
        feedBrand_en,
        feedBrand_ar,
        type,
        productNumber,
        barcodeNumber,
        productDescription_en,
        productDescription_ar,
        IngredientsList_en,
        IngredientsList_ar,
        warningInformation_en,
        warningInformation_ar,
        nameAndAddress_en,
        nameAndAddress_ar,
        countryOfOrigin_en,
        countryOfOrigin_ar,
        packagingMaterial_en,
        packagingMaterial_ar,
        dateMarkingAndInstructiosForStorageAndUse_en,
        dateMarkingAndInstructiosForStorageAndUse_ar,
        nutritionalFacts,
        energy,
        protein,
        totalCarbohydrates,
        totalSugar,
        dietaryFiber,
        totalFat,
        saturatedFat,
        monounsaturatedFat,
        polyunsaturatedFat,
        transFat,
        cholesterol,
        iron,
        folicAcid,
        sodium,
        thiamine,
        riboflavin,
        niacin,
        vitaminD
      );

      return res.status(StatusCodes.OK).json({
        data: { product },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  delete: async ({ body: { id } }: IBodyRequest<any>, res: Response) => {
    try {
      const isExist = await productService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const product = await productService.deleteById(id);

      return res.status(StatusCodes.OK).json({
        data: { product },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
