import { HttpStatus, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    providePrismaClientExceptionFilter({
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2023: HttpStatus.NOT_FOUND,
      P2025: HttpStatus.NOT_FOUND,
    }),
  ],
})
export class AppModule {}
