import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from './code/code.module';
import { ConfigModule } from '@nestjs/config';
import { ContractModule } from './contract/contract.module';
import { Web3Module } from 'nest-web3';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    Web3Module.forRoot({
      name: 'eth',
      url: process.env.WEB3_URL,
    }),
    CodeModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
