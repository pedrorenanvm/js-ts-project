import { Router } from "express";
import { celebrate } from "celebrate";
import { createCarValidationSchema } from "../validations/CreateCarValidator";
import { showCarValidationSchema } from "../validations/ShowCarValidator";
import { updateCarValidationSchema } from "../validations/UpdateCarValidator";
import { deleteCarValidationSchema } from "../validations/DeleteCarValidator";
import { listCarsValidationSchema } from "../validations/ListCarsValidator";
import CarController from "../controllers/CarController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const carRouter = Router();
const carController = new CarController();

carRouter.post(
  "/",
  isAuthenticated,
  celebrate(createCarValidationSchema),
  carController.create
);

carRouter.get(
  "/",
  isAuthenticated,
  celebrate(listCarsValidationSchema),
  carController.index
);

carRouter.get(
  "/:id",
  isAuthenticated,
  celebrate(showCarValidationSchema),
  carController.show
);

carRouter.patch(
  "/:id",
  isAuthenticated,
  celebrate(updateCarValidationSchema),
  carController.update
);

carRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate(deleteCarValidationSchema),
  carController.delete
);

export default carRouter;
