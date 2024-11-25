import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CarRepository from "../typeorm/repositories/CarRepository";
import { CarStatus } from "../typeorm/entities/Car";

interface IRequest {
  id: string;
}

class DeleteCarService {
  public async execute({ id }: IRequest): Promise<void> {
    const carRepository = getCustomRepository(CarRepository);

    const car = await carRepository.findOne(id);

    if (!car) {
      throw new AppError("Car not found", 404);
    }

    if (car.status === CarStatus.DELETED) {
      throw new AppError("Car already deleted", 400);
    }

    car.status = CarStatus.DELETED;

    await carRepository.save(car);
  }
}

export default DeleteCarService;
