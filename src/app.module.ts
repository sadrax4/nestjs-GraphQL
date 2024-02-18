import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './cars/car.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';

@Module({
  imports: [
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
        UserEntity
      ],
      port: 3306,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    // JwtModule.register({
    //   global: true,
    //   secret: "secret",
    //   signOptions: {
    //     expiresIn: '1d'
    //   },
    //}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}


