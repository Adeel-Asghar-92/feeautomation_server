import { Schema, model } from "mongoose";
import { IProduct } from "../contracts/product";

const schema = new Schema<IProduct>(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    name_en: String,
    name_ar: String,
    image: String,
    image_ar: String,
    nameHeading_ar: String,
    nameHeading_en: String,
    weight: String,

    feedBrand_en: String,
    feedBrand_ar: String,
    type: String,

    // specification
    productNumber: String,
    barcodeNumber: String,
    productDescription_en: String,
    productDescription_ar: String,
    IngredientsList_en: String,
    IngredientsList_ar: String,
    warningInformation_en: String,
    warningInformation_ar: String,
    nameAndAddress_en: String,
    nameAndAddress_ar: String,
    countryOfOrigin_en: String,
    countryOfOrigin_ar: String,
    packagingMaterial_en: String,
    packagingMaterial_ar: String,
    dateMarkingAndInstructiosForStorageAndUse_en: String,
    dateMarkingAndInstructiosForStorageAndUse_ar: String,

    // nutrition
    nutritionalFacts: String,
    energy: String,
    protein: String,
    totalCarbohydrates: String,
    totalSugar: String,
    dietaryFiber: String,
    totalFat: String,
    saturatedFat: String,
    monounsaturatedFat: String,
    polyunsaturatedFat: String,
    transFat: String,
    cholesterol: String,
    iron: String,
    folicAcid: String,
    sodium: String,
    thiamine: String,
    riboflavin: String,
    niacin: String,
    vitaminD: String,
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", schema);
