import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { CarEntity } from './car.entity';
import { CreateCarDto, FindCarDto, GetCarByModelDto, UpdateCarDto } from './dto/car-dto';
import { Req, UseGuards } from '@nestjs/common';

@Resolver(of => CarEntity)
export class CarsResolver {
    constructor(private carsService: CarsService) { }

    @Mutation(returns => CarEntity)
    createCar(
        @Context() ctx: any,
        @Args("createCarDto")
        createdCarDto: CreateCarDto): Promise<CarEntity> {
        return this.carsService.create(createdCarDto, ctx);
    }
    @Query(returns => [CarEntity])
    getCars(): Promise<CarEntity[]> {
        return this.carsService.findAll();
    }

    @Mutation(returns => CarEntity)
    getCarById(@Args("findCarDto") findCarDto: FindCarDto): Promise<CarEntity> {
        return this.carsService.findById(findCarDto);
    }

    @Mutation(returns => CarEntity)
    removeCar(@Args("removeCarDto") removeCarDto: FindCarDto): Promise<CarEntity> {
        return this.carsService.removeById(removeCarDto);
    }

    @Mutation(returns => CarEntity)
    updateCar(@Args("updateCarDto") updateCarDto: UpdateCarDto): Promise<CarEntity> {
        return this.carsService.editCar(updateCarDto);
    }

    @Query(returns => [CarEntity])
    getCarByModel(@Args("getCarByModel") getCarByModelDto: GetCarByModelDto): Promise<CarEntity[]> {
        return this.carsService.getCarByModel(getCarByModelDto);
    }

}
