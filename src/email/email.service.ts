/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'strikeblood7777@gmail.com',
        pass: 'qjlv fsta ljml iikr',
      },
    });
  }

  async enviarEmail(to: string, asunto: string, texto: string) {
    const mailOptions = {
      from: process.env.EMAIL_REMITENTE,
      to,
      subject: asunto,
      text: texto,
    };

    return this.transporter.sendMail(mailOptions)
  }
}
