import { Module } from '@nestjs/common';
import { HealthController } from './adapters/controllers/health.controller';

/** Composition root: wires ports to adapters. Feature modules are added here. */
@Module({
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
