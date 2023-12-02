import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { productController } from "../../controllers/productController";
import { productValidation } from "../../validations/productValidation";
import { gernalSettingsController } from "../../controllers/gernalSettingController";
import { companyInfoValidation } from "../../validations/companyInfoValidation";

const gernalSetting = (router: Router): void => {
  router.post(
    "/gernalSetting/updateLogo",
    // gernalSettingValidation.create,
    gernalSettingsController.updateLogo
  );
  router.post(
    "/gernalSetting/updateCompanyInfo",
    companyInfoValidation.updateCompanyInfo,
    gernalSettingsController.updateCompanyInfo
  );
  router.post(
    "/gernalSetting/updateVideo",
    // gernalSettingValidation.create,
    gernalSettingsController.updateVideo
  );
  router.post(
    "/gernalSetting/updateSocialMediaLinks",
    // gernalSettingValidation.create,
    gernalSettingsController.updateSocialMediaLinks
  );
  router.get(
    "/gernalSetting/getLogo",
    // gernalSettingValidation.create,
    gernalSettingsController.getLogo
  );
  router.get(
    "/gernalSetting/getCompanyInfo",
    // gernalSettingValidation.create,
    gernalSettingsController.getCompanyInfo
  );
  router.get(
    "/gernalSetting/getVideo",
    // gernalSettingValidation.create,
    gernalSettingsController.getVideo
  );
  router.get(
    "/gernalSetting/getSocialMediaLinks",
    // gernalSettingValidation.create,
    gernalSettingsController.getSocialMediaLinks
  );

  // router.get("/gernalSetting/get", gernalSettingsController.get);
};

export default gernalSetting;
