import { ObjectId } from "mongoose";
import { Product } from "../models";

export const productService = {
  create: ({
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
  }: {
    brand: ObjectId;
    category: ObjectId;
    name_en: string;
    name_ar: string;
    image: string;
    image_ar: string;
    nameHeading_ar: string;
    nameHeading_en: string;
    weight: string;
    feedBrand_en: string;
    feedBrand_ar: string;
    type: string;
    productNumber: string;
    barcodeNumber: string;
    productDescription_en: string;
    productDescription_ar: string;
    IngredientsList_en: string;
    IngredientsList_ar: string;
    warningInformation_en: string;
    warningInformation_ar: string;
    nameAndAddress_en: string;
    nameAndAddress_ar: string;
    countryOfOrigin_en: string;
    countryOfOrigin_ar: string;
    packagingMaterial_en: string;
    packagingMaterial_ar: string;
    dateMarkingAndInstructiosForStorageAndUse_en: string;
    dateMarkingAndInstructiosForStorageAndUse_ar: string;
    nutritionalFacts: string;
    energy: string;
    protein: string;
    totalCarbohydrates: string;
    totalSugar: string;
    dietaryFiber: string;
    totalFat: string;
    saturatedFat: string;
    monounsaturatedFat: string;
    polyunsaturatedFat: string;
    transFat: string;
    cholesterol: string;
    iron: string;
    folicAcid: string;
    sodium: string;
    thiamine: string;
    riboflavin: string;
    niacin: string;
    vitaminD: string;
  }) =>
    new Product({
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
    }).save(),

  getById: (id: ObjectId) => Product.findById(id),

  getByName: (name_en: string, name_ar: string) =>
    Product.findOne({ name_en, name_ar }),

  getAll: () =>
    Product.find()
      .populate("category", ["name_en", "name_ar"])
      .populate("brand", ["name", "name_ar"])
      .sort({ index: "asc" }),

  isExist: (
    name_en: string,
    name_ar: string,
    brand: ObjectId,
    category: ObjectId,
    type: string
  ) => Product.exists({ name_en, name_ar, brand, category, type }),

  updateProductById: (
    id: ObjectId,
    brand: ObjectId,
    category: ObjectId,
    name_en: string,
    name_ar: string,
    image: string,
    image_ar: string,
    nameHeading_ar: string,
    nameHeading_en: string,
    weight: string,
    feedBrand_en: string,
    feedBrand_ar: string,
    type: string,
    productNumber: string,
    barcodeNumber: string,
    productDescription_en: string,
    productDescription_ar: string,
    IngredientsList_en: string,
    IngredientsList_ar: string,
    warningInformation_en: string,
    warningInformation_ar: string,
    nameAndAddress_en: string,
    nameAndAddress_ar: string,
    countryOfOrigin_en: string,
    countryOfOrigin_ar: string,
    packagingMaterial_en: string,
    packagingMaterial_ar: string,
    dateMarkingAndInstructiosForStorageAndUse_en: string,
    dateMarkingAndInstructiosForStorageAndUse_ar: string,
    nutritionalFacts: string,
    energy: string,
    protein: string,
    totalCarbohydrates: string,
    totalSugar: string,
    dietaryFiber: string,
    totalFat: string,
    saturatedFat: string,
    monounsaturatedFat: string,
    polyunsaturatedFat: string,
    transFat: string,
    cholesterol: string,
    iron: string,
    folicAcid: string,
    sodium: string,
    thiamine: string,
    riboflavin: string,
    niacin: string,
    vitaminD: string
  ) => {
    const data = [
      { _id: id },
      {
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
    ];
    let params = null;
    params = data;

    return Product.updateOne(...params);
  },

  deleteById: (id: ObjectId) => Product.deleteOne({ _id: id }),
};
