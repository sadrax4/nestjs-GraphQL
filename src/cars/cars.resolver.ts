import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { CarEntity } from './car.entity';
import { CreateCarDto, FindCarDto, UpdateCarDto } from './dto/carDto';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Resolver(of => CarEntity)
export class CarsResolver {
    constructor(private carsService: CarsService) { }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => CarEntity)
    createCar(
        @Context() ctx: any,
        @Args("createCarDto")
        createdCarDto: CreateCarDto): Promise<CarEntity> {
        return this.carsService.create(createdCarDto, ctx);
    }
    @UseGuards(JwtAuthGuard)
    @Query(returns => [CarEntity])
    getCars(): Promise<CarEntity[]> {
        return this.carsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => CarEntity)
    getCarById(@Args("findCarDto") findCarDto: FindCarDto): Promise<CarEntity> {
        return this.carsService.findById(findCarDto);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => CarEntity)
    removeCar(@Args("removeCarDto") removeCarDto: FindCarDto): Promise<CarEntity> {
        return this.carsService.removeById(removeCarDto);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => CarEntity)
    updateCar(@Args("updateCarDto") updateCarDto: UpdateCarDto): Promise<CarEntity> {
        return this.carsService.editCar(updateCarDto);
    }

}
