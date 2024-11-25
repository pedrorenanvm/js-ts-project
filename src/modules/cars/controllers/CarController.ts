import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateCarService from "../services/CreateCarService";
import ShowCarService from "../services/ShowCarService";
import UpdateCarService from "../services/UpdateCarService";
import DeleteCarService from "../services/DeleteCarService";
import ListCarsService from "../services/ListCarsService";

export default class CarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { license_plate, brand, model, km, year, items, price } = req.body;

    const createCar = new CreateCarService();

    const car = await createCar.execute({
      license_plate,
      brand,
      model,
      km,
      year,
      items,
      price,
    });
    return res.status(201).json(instanceToInstance(car));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const filters = req.query as any;
    const listCarsService = new ListCarsService();

    const { data, total, totalPages } = await listCarsService.execute(filters);

    return res.status(200).json({ data, total, totalPages });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCar = new ShowCarService();

    const car = await showCar.execute({ id });

    return res.json(instanceToInstance(car));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateData = req.body;

    const updateCarService = new UpdateCarService();

    const car = await updateCarService.execute({ id, ...updateData });

    return res.json(instanceToInstance(car));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCarService = new DeleteCarService();

    await deleteCarService.execute({ id });

    return res.status(204).send();
  }
}
