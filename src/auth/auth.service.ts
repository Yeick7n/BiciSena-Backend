/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from './dto/register';
import * as bcryptjs from 'bcryptjs';
import { EmailService } from 'src/email/email.service';
import { randomBytes } from 'crypto';
import { LoginDto } from './dto/login';


@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async registro(registro: RegisterDto) {

    // VALIDAR QUE EL EMAIL Y EL USER CON EL QUE SE VA A REGISTRAR NO EXISTA EN LA BD
    const emailFound = await this.usuariosService.findOneByEmail(
      registro.email,
    );
    if (emailFound) {
      throw new Error('This email already exists in another user');
    }

    const userFound = await this.usuariosService.findOneByUser(registro.usuario);
    if (userFound) {
      throw new Error('This email already exists in another user');
    }

    // CREACIÓN DE UN TOKEN ALEATORIO
    const confirmToken = randomBytes(32).toString('hex');


    const newUser = await this.usuariosService.create({
      ...registro,
      password: await bcryptjs.hash(registro.password, 10),
      confirmToken,
      isConfirmed: false,
      isLogueado: false,
    });


    await this.emailService.enviarEmail(
      newUser.email,
      'CONFIRMACIÓN DE EMAIL',
      `Hola ${newUser.usuario}, \n\n Te damos la bienvenida a BiciSena, gracias por registrarte en la plataforma.\n
      Por favor, confirma tu correo haciendo clic en el siguiente enlace: http://localhost:3000/#/confirmar/${confirmToken}`,
    );

    return newUser;
  }


  async login(login: LoginDto) {

    const emailFound = await this.usuariosService.findOneByEmail(login.email);

    if(emailFound.isLogueado === true) {
      return new HttpException('El usuario ya inició sesión', HttpStatus.CONFLICT)
    }

    if (!emailFound) {
      throw new Error('Credenciales incorrectas');
    }

    const passwordCompare = await bcryptjs.compare(
      login.password,
      emailFound.password,
    );

    if (!passwordCompare) {
      throw new Error('Credenciales incorrectas');
    }

    const payload = {
      user: emailFound.usuario,
      sub: emailFound.id,
    };

    emailFound.isLogueado = true;

    await this.usuariosService.updateUsuario(emailFound.id, emailFound)

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: emailFound,
    }
  }
}