/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';
import { BicicletasModule } from './bicicletas/bicicletas.module';
import { MarcasModule } from './marcas/marcas.module';
import { CiclopaseosModule } from './ciclopaseos/ciclopaseos.module';
import { AlquilerModule } from './alquiler/alquiler.module';
import { RegionalModule } from './regional/regional.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuariosModule,
    EmailModule,
    AuthModule,
    RolModule,
    BicicletasModule,
    MarcasModule,
    CiclopaseosModule,
    AlquilerModule,
    RegionalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
