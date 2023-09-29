import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './resolve/service/service.module';
import { CarsModule } from './cars/cars.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './cars/car.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
@Module({
  imports: [
    ServiceModule,
    CarsModule,
    //PassportModule.register({ defaultStrategy: 'jwt' }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql")
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      database: "cars",
      host: "localhost",
      username: "phpmyadmin",
      password: "!Sadra35289546",
      entities: [
        CarEntity,
        User
      ],
      port: 3306,
      synchronize: true,
    }),
    // JwtModule.register({
    //   global: true,
    //   secret: "secret",
    //   signOptions: {
    //     expiresIn: '1d'
    //   },
    //}),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}

//    entities: ["/dist/cars/*.entity.{ts,js}"],
// entities: [__dirname + "/../**/*.entity.{js,ts}"],
