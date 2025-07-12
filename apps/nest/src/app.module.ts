import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationModule } from './core/validation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ValidationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
