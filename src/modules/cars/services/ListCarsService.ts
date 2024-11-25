import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CarRepository from "../typeorm/repositories/CarRepository";
import Car from "../typeorm/entities/Car";

interface IFilterOptions {
  status?: "ativo" | "inativo";
  licensePlateEnd?: string;
  brand?: string;
  model?: string;
  items?: string[];
  km?: number;
  fromYear?: number;
  untilYear?: number;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: "price" | "year" | "km";
  orderDirection?: "ASC" | "DESC";
  page?: number;
  perPage?: number;
}

class ListCarsService {
  public async execute(
    filters: IFilterOptions = {}
  ): Promise<{ data: Car[]; total: number; totalPages: number }> {
    const carRepository = getCustomRepository(CarRepository);
    const {
      status,
      licensePlateEnd,
      brand,
      model,
      items,
      km,
      fromYear,
      untilYear,
      minPrice,
      maxPrice,
      orderBy = "price",
      orderDirection = "ASC",
      page = 1,
      perPage = 10,
    } = filters;

    const query = carRepository.createQueryBuilder("car");

    query.andWhere("car.status IN (:...allowedStatuses)", {
      allowedStatuses: ["ativo", "inativo"],
    });

    if (status) {
      query.andWhere("car.status = :status", { status });
    }

    if (licensePlateEnd) {
      query.andWhere("car.license_plate LIKE :licensePlateEnd", {
        licensePlateEnd: `%${licensePlateEnd}`,
      });
    }

    if (brand) {
      query.andWhere("car.brand = :brand", { brand });
    }

    if (model) {
      query.andWhere("car.model = :model", { model });
    }

    if (items) {
      const itemsArray = Array.isArray(items) ? items : [items];
      query.andWhere("car.items @> :items", { items: itemsArray });
    }

    if (km) {
      query.andWhere("car.km <= :km", { km });
    }

    if (fromYear && untilYear) {
      query.andWhere("car.year BETWEEN :fromYear AND :untilYear", {
        fromYear,
        untilYear,
      });
    } else if (fromYear) {
      query.andWhere("car.year >= :fromYear", { fromYear });
    } else if (untilYear) {
      query.andWhere("car.year <= :untilYear", { untilYear });
    }

    if (minPrice && maxPrice) {
      query.andWhere("car.price BETWEEN :minPrice AND :maxPrice", {
        minPrice,
        maxPrice,
      });
    } else if (minPrice) {
      query.andWhere("car.price >= :minPrice", { minPrice });
    } else if (maxPrice) {
      query.andWhere("car.price <= :maxPrice", { maxPrice });
    }

    query.orderBy(`car.${orderBy}`, orderDirection);

    const skip = (page - 1) * perPage;
    query.skip(skip).take(perPage);

    const [data, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / perPage);

    if (data.length === 0) {
      throw new AppError("No cars found", 404);
    }

    return { data, total, totalPages };
  }
}

export default ListCarsService;
