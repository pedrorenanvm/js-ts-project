import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustomersController from "../controllers/CustomersController";
import { createCustomerValidationSchema } from "../validations/CreateCustomerValidator";
import { showCustomerValidationSchema } from "../validations/ShowCustomerValidator";
import { updateCustomerValidationSchema } from "../validations/UpdateCustomerValidator";
import { deleteCustomerValidationSchema } from "../validations/DeleteCustomerValidator";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get("/", customersController.index);

customersRouter.get(
    "/:id",
    isAuthenticated,
    celebrate(showCustomerValidationSchema),
    customersController.show
);

customersRouter.post(
    "/",
    isAuthenticated,
    celebrate(createCustomerValidationSchema),
    customersController.create
);

customersRouter.patch(
    "/:id",
    isAuthenticated,
    celebrate(updateCustomerValidationSchema),
    customersController.update
);

customersRouter.delete(
    "/:id",
    isAuthenticated,
    celebrate(deleteCustomerValidationSchema),
    customersController.delete
);

export default customersRouter;
