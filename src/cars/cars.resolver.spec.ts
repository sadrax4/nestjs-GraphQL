import { Test, TestingModule } from '@nestjs/testing';
import { CarsResolver } from './cars.resolver';

describe('CarsResolver', () => {
  let resolver: CarsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsResolver],
    }).compile();

    resolver = module.get<CarsResolver>(CarsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
