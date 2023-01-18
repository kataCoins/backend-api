import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from './code/code.module';
import { ConfigModule } from '@nestjs/config';
import { ContractModule } from './contract/contract.module';
import { Web3Module } from 'nest-web3';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    Web3Module.forRoot({
      name: 'eth',
      url: 'http://127.0.0.1:8545',
    }),
    CodeModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
