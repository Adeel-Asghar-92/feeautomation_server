import { Model, ObjectId } from "mongoose";
import { type } from "os";

export interface IProduct {
  brand: ObjectId;
  category: ObjectId;
  name_en: String;
  name_ar: String;
  image: String;
  image_ar: String;
  nameHeading_ar: String;
  nameHeading_en: String;
  weight: String;

  feedBrand_en: String;
  feedBrand_ar: String;
  type: String;

  productNumber: String;
  barcodeNumber: String;
  productDescription_en: String;
  productDescription_ar: String;
  IngredientsList_en: String;
  IngredientsList_ar: String;
  warningInformation_en: String;
  warningInformation_ar: String;
  nameAndAddress_en: String;
  nameAndAddress_ar: String;
  countryOfOrigin_en: String;
  countryOfOrigin_ar: String;
  packagingMaterial_en: String;
  packagingMaterial_ar: String;
  dateMarkingAndInstructiosForStorageAndUse_en: String;
  dateMarkingAndInstructiosForStorageAndUse_ar: String;

  nutritionalFacts: String;
  energy: String;
  protein: String;
  totalCarbohydrates: String;
  totalSugar: String;
  dietaryFiber: String;
  totalFat: String;
  saturatedFat: String;
  monounsaturatedFat: String;
  polyunsaturatedFat: String;
  transFat: String;
  cholesterol: String;

  iron: String;
  folicAcid: String;
  sodium: String;
  thiamine: String;
  riboflavin: String;
  niacin: String;
  vitaminD: String;
}
