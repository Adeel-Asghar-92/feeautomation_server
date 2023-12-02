import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from "method-override";
import { router } from "../api";
import config from "../config";
// import PDF_FILE_PATH from "../pdf/ISO-9001";
import fs from "fs";
const ISO9001 = "../pdf/ISO-9001.pdf";
const ISO14001 = "../pdf/ISO-14001.pdf";
const ISO22000 = "../pdf/ISO-22000.pdf";
const ISO45001 = "../pdf/ISO-45001.pdf";
export default ({ app }: { app: express.Application }) => {
  /**
   * API Status Check !!
   */
  app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.get("/status", (req, res) => {
    res.status(200).json({
      status: "OK! Server is working 100%  🔥",
    });
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.get("/ISO9001", (req, res) => {
    // Check if the PDF file exists
    if (fs.existsSync(ISO9001)) {
      // Set the appropriate response headers for serving a PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=yourfile.pdf");

      // Stream the PDF file to the response
      const stream = fs.createReadStream(ISO9001);
      stream.pipe(res);
    } else {
      // If the PDF file doesn't exist, return a 404 response
      res.status(404).send("PDF file not found");
    }
  });
  app.get("/ISO14001", (req, res) => {
    // Check if the PDF file exists
    if (fs.existsSync(ISO14001)) {
      // Set the appropriate response headers for serving a PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=yourfile.pdf");

      // Stream the PDF file to the response
      const stream = fs.createReadStream(ISO14001);
      stream.pipe(res);
    } else {
      // If the PDF file doesn't exist, return a 404 response
      res.status(404).send("PDF file not found");
    }
  });
  app.get("/ISO22000", (req, res) => {
    // Check if the PDF file exists
    if (fs.existsSync(ISO22000)) {
      // Set the appropriate response headers for serving a PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=yourfile.pdf");

      // Stream the PDF file to the response
      const stream = fs.createReadStream(ISO22000);
      stream.pipe(res);
    } else {
      // If the PDF file doesn't exist, return a 404 response
      res.status(404).send("PDF file not found");
    }
  });
  app.get("/ISO45001", (req, res) => {
    // Check if the PDF file exists
    if (fs.existsSync(ISO45001)) {
      // Set the appropriate response headers for serving a PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=yourfile.pdf");

      // Stream the PDF file to the response
      const stream = fs.createReadStream(ISO45001);
      stream.pipe(res);
    } else {
      // If the PDF file doesn't exist, return a 404 response
      res.status(404).send("PDF file not found");
    }
  });
  /* Setting up basics */
  app.enable("trust proxy");
  app.use(cors());
  app.use(methodOverride());
  app.use(bodyParser.json());

  // Load API routes with /api
  app.use(config.api.prefix, router);

  /// catch 404 and forward to error handler
  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const err = new Error("Not Found");
      // err["status"] = 404;
      next(err);
    }
  );

  /// error handlers
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /**
       * Handler 401
       */
      if (err.name === "UnauthorizedError") {
        return res.status(err.status).send({ message: err.message }).end();
      }
      return next(err);
    }
  );
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  );
};
