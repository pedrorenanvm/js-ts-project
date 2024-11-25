import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Car from "../typeorm/entities/Car";
import CarRepository from "../typeorm/repositories/CarRepository";

interface IRequest {
  license_plate: string;
  brand: string;
  model: string;
  km: number;
  year: number;
  items: string[];
  price: number;
}

class CreateCarService {
  public async execute({
    license_plate,
    brand,
    model,
    km,
    year,
    items,
    price,
  }: IRequest): Promise<Car> {
    const carRepository = getCustomRepository(CarRepository);

    const carExists = await carRepository.findByLicensePlate(license_plate);

    if (carExists) {
      throw new AppError("There is already a car with this license plate", 409);
    }

    if (year < new Date().getFullYear() - 10) {
      throw new AppError("The car cannot be older than 11 years", 400);
    }

    if (items.length > 5) {
      throw new AppError("The car can have a maximum of 5 items", 400);
    }

    const uniqueItems = new Set(items);
    if (uniqueItems.size !== items.length) {
      throw new AppError("The car items must be unique", 400);
    }

    const car = carRepository.create({
      license_plate,
      brand,
      model,
      km,
      year,
      items,
      price,
    });

    await carRepository.save(car);

    return car;
  }
}

export default CreateCarService;
