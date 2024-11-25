import { getCustomRepository } from "typeorm";
import CarRepository from "../typeorm/repositories/CarRepository";
import Car from "../typeorm/entities/Car";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

class ShowCarService {
  public async execute({ id }: IRequest): Promise<Car> {
    const carRepository = getCustomRepository(CarRepository);

    const car = await carRepository.findOne(id);

    if (!car) {
      throw new AppError("Car not found", 404);
    }

    return car;
  }
}

export default ShowCarService;
