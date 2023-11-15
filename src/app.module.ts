import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { EditorModule } from './editor/editor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        password: configService.get('DB_PASSWORD'),
        username: configService.get('DB_USERNAME'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        logging: true,
      }),
    }),
    AuthModule,
    UserModule,
    BoardsModule,
    EditorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
