import { Injectable, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { CarEntity } from './car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto, FindCarDto, UpdateCarDto } from './dto';
import { User } from 'src/auth/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(CarEntity)
        private readonly carRepository: Repository<CarEntity>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }
    async create(createCarDto: CreateCarDto, ctx: any): Promise<CarEntity> {
        const ownerId = ctx.req.user.id
        createCarDto.owner = ownerId;
        const car = this.carRepository.create(createCarDto);
        await this.carRepository.save(car);
        await this.updateUserCars(ownerId, car.id);
        if (!car) throw new InternalServerErrorException("can not create car ");
        return car;
    }
    async findAll(): Promise<CarEntity[]> {
        const cars = await this.carRepository.find();
        return cars
    }
    async updateUserCars(userId: any, carsId: any): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: String(userId) } })
        user.cars.push(String(carsId));
        return await this.userRepository.save(user);
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
}
