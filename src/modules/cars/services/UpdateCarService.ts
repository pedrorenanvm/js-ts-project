import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CarRepository from "../typeorm/repositories/CarRepository";
import Car, { CarStatus } from "../typeorm/entities/Car";

interface IRequest {
  id: string;
  license_plate?: string;
  brand?: string;
  model?: string;
  km?: number;
  year?: number;
  items?: string[];
  price?: number;
  status?: CarStatus;
}

class UpdateCarService {
  public async execute({ id, ...updateData }: IRequest): Promise<Car> {
    const carRepository = getCustomRepository(CarRepository);

    const car = await carRepository.findOne(id);

    if (!car) {
      throw new AppError("Car not found", 404);
    }

    if (car.status === CarStatus.DELETED) {
      throw new AppError("Cannot update a deleted car", 400);
    }

    if (updateData.license_plate) {
      const carWithUpdatedLicensePlate = await carRepository.findByLicensePlate(
        updateData.license_plate
      );

      if (carWithUpdatedLicensePlate && carWithUpdatedLicensePlate.id !== id) {
        throw new AppError("There is already a car with this license plate", 409);
      }
    }

    Object.assign(car, updateData);
    await carRepository.save(car);

    return car;
  }
}

export default UpdateCarService;
