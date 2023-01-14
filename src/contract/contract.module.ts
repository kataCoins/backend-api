import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ConfigModule } from '@nestjs/config';
import { Web3Module } from 'nest-web3';

@Module({
  imports: [ConfigModule, Web3Module],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
