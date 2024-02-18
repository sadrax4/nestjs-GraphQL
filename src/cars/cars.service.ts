import { Injectable, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { CarEntity } from './car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto, FindCarDto, GetCarByModelDto, UpdateCarDto } from './dto';
@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(CarEntity)
        private readonly carRepository: Repository<CarEntity>,
    ) { }
    async create(createCarDto: CreateCarDto, ctx: any): Promise<CarEntity> {
        // const ownerId = ctx.req.user.id
        // createCarDto.owner = ownerId;
        console.log(createCarDto);
        const car = this.carRepository.create(createCarDto);
        await this.carRepository.save(car);
        if (!car) throw new InternalServerErrorException("can not create car ");
        return car;
    }
    async findAll(): Promise<CarEntity[]> {
        const cars = await this.carRepository.find();
        return cars
    }

    async findById(findCarDto: FindCarDto): Promise<CarEntity> {
        const car = await this.carRepository.findOne({ where: { id: String(findCarDto.id) } });
        if (!car) throw new NotFoundException("car not found with this id ");
        return car;
    }
    async removeById(removeCarDto: FindCarDto): Promise<CarEntity> {
        const car = await this.carRepository.findOne({ where: { id: String(removeCarDto.id) } })
        await this.carRepository.delete({ id: String(removeCarDto.id) })
        return car;
    }
    async editCar(updateCarDto: UpdateCarDto): Promise<CarEntity> {
        const carProperty = await this.carRepository.findOne({ where: { id: updateCarDto.id } });
        delete updateCarDto.id;
        const car = await this.carRepository.save({
            id: updateCarDto.id,
            ...carProperty,
            ...updateCarDto
        })
        return car
    }
    async getCarByModel(getCarByModelDto: GetCarByModelDto) {
        return await this.carRepository.find();
    }
}
