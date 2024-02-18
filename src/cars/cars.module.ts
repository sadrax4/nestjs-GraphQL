import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity]),
  ],
  providers: [
    CarsService,
    CarsResolver,
  ]
})
export class CarsModule { }
