// mail.service.ts
import { GlobalEnum } from '@/utils/global.enum';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    // host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'shawicx@outlook.com',
      // user: 'konggu@uni-ubi.com',
      pass: 'eaa6a0f6-5afa-4efe-88ab-ef1bb0f5c2a4',
    },
  });

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async sendMail(to: string) {
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0');
    const mailOptions = {
      from: '空谷 shawicx@outlook.com',
      to,
      subject: 'uniubi-tool 验证码，请勿泄露',
      text: code,
    };
    await this.cacheManager.set(to, code, GlobalEnum.EMAIL_CODE_EXPIRED);
    return this.transporter.sendMail(mailOptions);
  }
}
