import { EntityRepository, In, Repository } from "typeorm";
import Car, { CarStatus } from "../entities/Car";

@EntityRepository(Car)
class CarRepository extends Repository<Car> {
  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.findOne({
      where: { id },
    });
    return car;
  }

  public async findByLicensePlate(
    license_plate: string
  ): Promise<Car | undefined> {
    const car = await this.findOne({
      where: {
        license_plate,
        status: In([CarStatus.ACTIVE, CarStatus.INACTIVE]),
      },
    });
    return car;
  }

  public async findAll(): Promise<Car[]> {
    const cars = await this.find();
    return cars;
  }
}

export default CarRepository;
