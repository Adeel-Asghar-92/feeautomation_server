import { Model, ObjectId } from "mongoose";

export interface ICategory {
  name_en: string;
  name_ar: string;
  type: string;
  brand: ObjectId;
}
