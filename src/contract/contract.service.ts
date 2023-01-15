import { Injectable } from '@nestjs/common';
import { Web3Service } from 'nest-web3';
import * as ContractAddress from './data/kata-address.json';
import * as ContractData from './data/KataCoins.json';
import { Contract } from 'web3-eth-contract';
import { KataDefinition } from './interfaces/kata-definition.interface';
import * as process from 'process';

@Injectable()
export class ContractService {
  constructor(private readonly web3Service: Web3Service) {}

  private async getContract(): Promise<Contract> {
    const client = this.web3Service.getClient('eth');
    const { abi } = ContractData;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new client.eth.Contract(abi, ContractAddress.KataCoins);
  }
  async getKata(id: number): Promise<KataDefinition> {
    const contract = await this.getContract();
    const kata = await contract.methods.getKata(id).call({
      from: process.env.OWNER_ADDRESS,
    });
    if (!kata) {
      return null;
    }
    return kata[0] as KataDefinition;
  }

  async canExecuteKata(kataId: number, userAddress: string): Promise<boolean> {
    const contract = await this.getContract();
    return await contract.methods.canExecuteKata(userAddress, kataId).call({
      from: process.env.OWNER_ADDRESS,
    });
  }
}
